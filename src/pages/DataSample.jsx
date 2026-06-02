import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, X } from 'lucide-react';

function AddPersonModal({ onClose, onSave }) {
  const generateId = () => `P-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
  const [form, setForm] = useState({ unique_id: generateId(), name: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const record = await base44.entities.People.create(form);
    onSave(record);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(2,11,26,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md mx-4 rounded-lg p-8"
        style={{
          background: '#030F22',
          border: '0.5px solid rgba(56,189,248,0.25)',
          boxShadow: '0 0 60px rgba(56,189,248,0.08)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm transition-colors"
          style={{ color: '#94A3B8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
        >
          <X className="w-4 h-4" />
        </button>

        <h2
          className="text-xl font-extrabold uppercase tracking-tight mb-6 font-display"
          style={{ color: '#E0F2FE', letterSpacing: '-0.02em' }}
        >
          Add Person
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#38BDF8' }}>
              Unique ID <span style={{ color: '#94A3B8', textTransform: 'none', letterSpacing: 'normal' }}>(auto)</span>
            </label>
            <input
              readOnly
              value={form.unique_id}
              className="w-full px-4 py-3 rounded text-sm outline-none font-mono cursor-default"
              style={{
                background: 'rgba(56,189,248,0.02)',
                border: '0.5px solid rgba(56,189,248,0.1)',
                color: '#94A3B8',
              }}
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#38BDF8' }}>
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
              style={{
                background: 'rgba(56,189,248,0.04)',
                border: '0.5px solid rgba(56,189,248,0.2)',
                color: '#E0F2FE',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(56,189,248,0.6)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)'}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded text-sm tracking-widest uppercase font-semibold transition-all mt-2"
            style={{
              background: saving ? 'rgba(56,189,248,0.1)' : 'rgba(56,189,248,0.15)',
              border: '0.5px solid rgba(56,189,248,0.4)',
              color: '#38BDF8',
            }}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.background = 'rgba(56,189,248,0.25)'; }}
            onMouseLeave={e => { if (!saving) e.currentTarget.style.background = 'rgba(56,189,248,0.15)'; }}
          >
            {saving ? 'Saving...' : 'Add Record'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function DataSample() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);
  const navigate = useNavigate();

  const handleAutoAdd = async () => {
    setAutoLoading(true);
    const res = await base44.functions.invoke('generatePerson', {});
    setPeople(prev => [...prev, res.data.record]);
    setAutoLoading(false);
  };

  useEffect(() => {
    base44.entities.People.list().then((data) => {
      setPeople(data);
      setLoading(false);
    });
  }, []);

  const handleSave = (record) => {
    setPeople(prev => [...prev, record]);
  };

  return (
    <div
      className="relative min-h-screen"
      style={{ background: '#020B1A' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(56,189,248,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 px-8 md:px-[8vw] py-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm tracking-widest uppercase mb-12 transition-colors"
          style={{ color: '#94A3B8' }}
          onMouseEnter={e => e.currentTarget.style.color = '#38BDF8'}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Title row */}
        <div className="flex items-end justify-between gap-4 mb-12">
          <div>
            <h1
              className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-2 font-display"
              style={{ color: '#E0F2FE', letterSpacing: '-0.03em' }}
            >
              People
            </h1>
            <p className="text-sm tracking-widest uppercase" style={{ color: '#94A3B8' }}>
              Data Sample
            </p>
          </div>

          <div className="flex items-center gap-3">
          {/* Auto Add button */}
          <button
            onClick={handleAutoAdd}
            disabled={autoLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded text-sm tracking-widest uppercase font-semibold transition-all"
            style={{
              background: 'rgba(56,189,248,0.04)',
              border: '0.5px solid rgba(56,189,248,0.2)',
              color: '#94A3B8',
            }}
            onMouseEnter={e => { if (!autoLoading) e.currentTarget.style.background = 'rgba(56,189,248,0.1)'; }}
            onMouseLeave={e => { if (!autoLoading) e.currentTarget.style.background = 'rgba(56,189,248,0.04)'; }}
          >
            {autoLoading ? 'Generating...' : '⚡ Add Auto Sample'}
          </button>

          {/* Add button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded text-sm tracking-widest uppercase font-semibold transition-all"
            style={{
              background: 'rgba(56,189,248,0.08)',
              border: '0.5px solid rgba(56,189,248,0.35)',
              color: '#38BDF8',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(56,189,248,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(56,189,248,0.08)'}
          >
            <Plus className="w-4 h-4" />
            Add Record
          </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '0.5px solid rgba(56,189,248,0.15)' }}
        >
          <div
            className="grid grid-cols-2 px-6 py-3 text-xs tracking-widest uppercase"
            style={{
              background: 'rgba(56,189,248,0.05)',
              borderBottom: '0.5px solid rgba(56,189,248,0.1)',
              color: '#38BDF8',
            }}
          >
            <span>Unique ID</span>
            <span>Name</span>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-sm tracking-widest uppercase" style={{ color: '#94A3B8' }}>
              Loading...
            </div>
          ) : (
            people.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-2 px-6 py-4 text-sm"
                style={{
                  borderBottom: i < people.length - 1 ? '0.5px solid rgba(56,189,248,0.06)' : 'none',
                  color: '#E0F2FE',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(56,189,248,0.02)',
                }}
              >
                <span style={{ color: '#94A3B8', fontFamily: 'monospace' }}>{person.unique_id}</span>
                <span>{person.name}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AddPersonModal onClose={() => setShowModal(false)} onSave={handleSave} />
        )}
      </AnimatePresence>
    </div>
  );
}