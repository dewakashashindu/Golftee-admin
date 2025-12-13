"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface Equipment {
  id: string;
  name: string;
  type: "Golf Clubs" | "Golf Carts" | "Accessories" | "Maintenance Tools" | "Bags & Carriers" | "Training & Practice";
  description: string;
  quantity: number;
  condition: "excellent" | "good" | "fair" | "needs_repair";
  rentalPrice: string; // e.g. "$25/day" or "25"
  addedDate: string; // ISO date or YYYY-MM-DD
}

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "";
// Normalize API base to avoid double "/api" or trailing slashes
const API_BASE = BACKEND.replace(/\/+$|\/api$/g, "");
const buildApiUrl = (path: string) => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}/api${p}`;
};

export default function EquipmentPage() {
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [pageSize, setPageSize] = useState(6);

  // data state
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // controls
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCondition, setFilterCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"addedDate" | "name" | "price">("addedDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    name: "",
    type: "Golf Carts" as Equipment['type'],
    description: "",
    quantity: "",
    condition: "excellent" as Equipment['condition'],
    rentalPrice: ""
  });

  // Fetch equipment from API
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(buildApiUrl('/equipment'));
      const result = await response.json();
      
      if (result.success && result.data) {
        // Transform API data to match frontend interface
        const transformed = result.data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          type: item.type,
          description: item.description || '',
          quantity: item.quantity || 0,
          condition: item.condition || 'good',
          rentalPrice: item.rental_price ? `$${item.rental_price}` : '$0',
          addedDate: item.created_at ? item.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
        }));
        setEquipment(transformed);
        setTotal(transformed.length);
      } else {
        setError('Failed to load equipment');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveEquipment();
  };

  const handleSaveEquipment = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const payload = {
        name: form.name,
        type: form.type,
        description: form.description,
        quantity: parseInt(form.quantity) || 0,
        condition: form.condition,
        rentalPrice: form.rentalPrice.replace('$', '').replace('/day', '').trim()
      };

      const url = editingId ? buildApiUrl(`/equipment/${editingId}`) : buildApiUrl('/equipment');
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setInfoMessage(editingId ? 'Equipment updated successfully' : 'Equipment added successfully');
        fetchEquipment(); // Reload data
        setForm({ name: "", type: "Golf Carts", description: "", quantity: "", condition: "excellent", rentalPrice: "" });
        setEditingId(null);
        setShowForm(false);
        setTimeout(() => setInfoMessage(null), 3000);
      } else {
        setError(result.error || 'Failed to save equipment');
      }
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Equipment) => {
    setForm({
      name: item.name,
      type: item.type,
      description: item.description,
      quantity: item.quantity.toString(),
      condition: item.condition,
      rentalPrice: item.rentalPrice
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this equipment?")) {
      deleteEquipment(id);
    }
  };

  const deleteEquipment = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(buildApiUrl(`/equipment/${id}`), {
        method: "DELETE"
      });

      const result = await response.json();

      if (result.success) {
        setInfoMessage("Equipment deleted successfully");
        fetchEquipment();
        setTimeout(() => setInfoMessage(null), 3000);
      } else {
        setError(result.error || "Failed to delete equipment");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setForm({ name: "", type: "Golf Carts", description: "", quantity: "", condition: "excellent", rentalPrice: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Golf Carts':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-3a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3m-6 0h6m6 0V9a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 0012 9v.75m1.5 4.5h6m0 0V9a1.5 1.5 0 00-1.5-1.5H15m4.5 6.75h.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-.75m0 0V9" />
          </svg>
        );
      case 'Golf Clubs':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
          </svg>
        );
      case 'Accessories':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        );
      case 'Maintenance Tools':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
        );
      case 'Bags & Carriers':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        );
      case 'Training & Practice':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="equipment-type-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        );
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'condition-excellent';
      case 'good': return 'condition-good';
      case 'fair': return 'condition-fair';
      case 'needs_repair': return 'condition-repair';
      default: return 'condition-good';
    }
  };

  return (
    <div className="equipment-container">
      <title>Equipment Management - GolfTee Admin</title>
      
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <Navigation currentPage="equipment" />

      
      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Equipment Management</h1>
            <p className="page-subtitle">Manage golf course equipment, rentals, and inventory</p>
          </div>
          
          <div className="page-actions">
            <button onClick={() => setShowForm(true)} className="add-equipment-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Equipment
            </button>
          </div>
        </div>

        {/* Equipment Form */}
        {showForm && (
          <div className="form-overlay">
            <div className="form-container">
              <div className="form-header">
                <h3>{editingId ? 'Edit Equipment' : 'Add New Equipment'}</h3>
                <button onClick={handleCancelEdit} className="close-btn">×</button>
              </div>
              <form onSubmit={handleSubmit} className="equipment-form">
                <div className="form-group">
                  <label>Equipment Name:</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                    placeholder="e.g., Golf Cart Premium, Driver Set"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({...form, type: e.target.value as Equipment['type']})}
                      title="Equipment Type"
                    >
                      <option value="Golf Clubs">Golf Clubs</option>
                      <option value="Golf Carts">Golf Carts</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Maintenance Tools">Maintenance Tools</option>
                      <option value="Bags & Carriers">Bags & Carriers</option>
                      <option value="Training & Practice">Training & Practice</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={(e) => setForm({...form, quantity: e.target.value})}
                      required
                      min="1"
                      title="Equipment Quantity"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    rows={3}
                    placeholder="Brief description of the equipment..."
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Condition:</label>
                    <select
                      value={form.condition}
                      onChange={(e) => setForm({...form, condition: e.target.value as Equipment['condition']})}
                      title="Equipment Condition"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="needs_repair">Needs Repair</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Rental Price:</label>
                    <input
                      type="text"
                      value={form.rentalPrice}
                      onChange={(e) => setForm({...form, rentalPrice: e.target.value})}
                      placeholder="e.g., $25/day"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingId ? 'Update Equipment' : 'Add Equipment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Equipment List */}
        <div className="equipment-list">
          {equipment.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m6.75 4.5v-3a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3m-6 0h6m6 0V9a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 0012 9v.75m1.5 4.5h6m0 0V9a1.5 1.5 0 00-1.5-1.5H15m4.5 6.75h.75a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-.75m0 0V9" />
                </svg>
              </div>
              <h3>No Equipment Found</h3>
              <p>Add your first piece of equipment to get started.</p>
            </div>
          ) : (
            <div className="equipment-grid">
              {equipment.map((item) => (
                <div key={item.id} className="equipment-card">
                  <div className="equipment-header">
                    <div className="equipment-icon">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="equipment-actions">
                      <button onClick={() => handleEdit(item)} className="edit-btn" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="delete-btn" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="equipment-body">
                    <h3 className="equipment-name">{item.name}</h3>
                    <p className="equipment-description">{item.description}</p>
                    
                    <div className="equipment-details">
                      <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value type-badge">{item.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Quantity:</span>
                        <span className="detail-value">{item.quantity}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Condition:</span>
                        <span className={`detail-value condition-badge ${getConditionColor(item.condition)}`}>
                          {item.condition.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Rental Price:</span>
                        <span className="detail-value price">{item.rentalPrice}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Added:</span>
                        <span className="detail-value">{item.addedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .equipment-container {
          min-height: 100vh;
          background: #f0f0f0;
          position: relative;
          overflow: hidden;
        }

        .bg-circle-left {
          position: absolute;
          left: -300px;
          top: -250px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
        }

        .bg-circle-right {
          position: absolute;
          right: -200px;
          bottom: 150px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
        }



        .main-content {
          position: relative;
          z-index: 10;
          padding: 1rem 3.5rem 2rem 3.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .page-title-section {
          flex: 1;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111;
          margin: 0 0 0.5rem 0;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          margin: 0;
        }

        .page-actions {
          display: flex;
          gap: 1rem;
        }

        .add-equipment-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #16a34a;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-equipment-btn:hover {
          background: #15803d;
          transform: translateY(-1px);
        }

        .form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 1rem;
        }

        .form-container {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 100000;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #6b7280;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .equipment-form {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.9rem;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .submit-btn {
          background: #16a34a;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-btn:hover {
          background: #15803d;
        }

        .equipment-list {
          margin-top: 2rem;
        }

        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .equipment-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }

        .equipment-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .equipment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .equipment-icon {
          width: 48px;
          height: 48px;
          background: #f3f4f6;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .equipment-type-icon {
          width: 24px;
          height: 24px;
          color: #16a34a;
        }

        .equipment-actions {
          display: flex;
          gap: 0.5rem;
        }

        .edit-btn, .delete-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-btn {
          background: #f3f4f6;
          color: #6b7280;
        }

        .edit-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .delete-btn {
          background: #fef2f2;
          color: #dc2626;
        }

        .delete-btn:hover {
          background: #fecaca;
        }

        .edit-btn svg, .delete-btn svg {
          width: 16px;
          height: 16px;
        }

        .equipment-body {
          
        }

        .equipment-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 0.5rem 0;
        }

        .equipment-description {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .equipment-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 500;
        }

        .detail-value {
          font-size: 0.85rem;
          color: #374151;
          font-weight: 500;
        }

        .type-badge {
          background: #f3f4f6;
          color: #374151;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: capitalize;
        }

        .condition-badge {
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: capitalize;
        }

        .condition-excellent {
          background: #d1fae5;
          color: #065f46;
        }

        .condition-good {
          background: #dbeafe;
          color: #1e40af;
        }

        .condition-fair {
          background: #fef3c7;
          color: #92400e;
        }

        .condition-repair {
          background: #fecaca;
          color: #991b1b;
        }

        .price {
          font-weight: 600;
          color: #16a34a;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6b7280;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: #d1d5db;
        }

        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.5rem 0;
        }

        .empty-state p {
          font-size: 1rem;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .main-content {
            padding: 1rem 2rem 2rem 2rem;
          }
        }

        @media (max-width: 800px) {
          .main-content {
            padding: 1rem 0.5rem 2rem 0.5rem;
          }
          .page-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .page-title {
            font-size: 2rem;
          }
          .equipment-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-actions {
            flex-direction: column-reverse;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.5rem;
          }
          .equipment-card {
            padding: 1rem;
          }
          .form-container {
            margin: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

