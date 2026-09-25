import React, { useState, useEffect } from 'react';
import { User, Hash, X, CheckCircle, ArrowRight } from 'lucide-react';

export const ProfileModal = ({
  isOpen,
  onClose,
  initialName,
  initialReg,
  userGroup,
  setUserGroup,
  onSave
}) => {
  const [name, setName] = useState(initialName || '');
  const [reg, setReg] = useState(initialReg || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(initialName || '');
    setReg(initialReg || '');
  }, [initialName, initialReg, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!reg.trim()) {
      setError('Please enter your registration or roll number.');
      return;
    }
    setError('');
    onSave(name.trim(), reg.trim().toUpperCase());
  };

  const isFirstTime = !initialName && !initialReg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Close button if not forced first time */}
        {!isFirstTime && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center sm:text-left mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 mx-auto sm:mx-0">
            <User className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-100">
            {isFirstTime ? 'Student Identification' : 'Edit Student Profile'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Enter your name and registration number for 3rd Sem CSE attendance tracking.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Full Name <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                required
                placeholder="e.g. Rahul Kumar"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Registration / Roll Number */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Registration / Roll Number <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                required
                placeholder="e.g. F24045001 or 24045..."
                value={reg}
                onChange={(e) => { setReg(e.target.value); setError(''); }}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 uppercase transition-all"
              />
            </div>
          </div>

          {/* Practical Lab Group Assignment */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Practical Lab Group
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUserGroup('GR1')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold font-mono transition-all ${
                  userGroup === 'GR1'
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Group 1 (GR1)
              </button>
              <button
                type="button"
                onClick={() => setUserGroup('GR2')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold font-mono transition-all ${
                  userGroup === 'GR2'
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-500 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Group 2 (GR2)
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Select your allotted practical batch for lab routines.
            </p>
          </div>

          {/* Inline Error Message */}
          {error && (
            <p className="text-xs text-rose-400 font-medium">
              {error}
            </p>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{isFirstTime ? 'Save & Start Tracking' : 'Save Changes'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
