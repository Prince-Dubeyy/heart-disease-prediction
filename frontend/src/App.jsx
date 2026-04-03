import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Activity, 
  Heart, 
  ArrowRight, 
  RefreshCcw, 
  Stethoscope, 
  Info,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

const API_URL = 'http://localhost:8000/predict';

const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'form', 'result'
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  
  const [formData, setFormData] = useState({
    Age: 50,
    Sex: 'M',
    ChestPainType: 'ATA',
    RestingBP: 120,
    Cholesterol: 200,
    FastingBS: 0,
    RestingECG: 'Normal',
    MaxHR: 150,
    ExerciseAngina: 'N',
    Oldpeak: 0.0,
    ST_Slope: 'Flat'
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, formData);
      setResult(response.data);
      setView('result');
    } catch (err) {
      console.error(err);
      setError('Connection to the prediction server failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setView('landing');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500">
      {/* Theme Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 p-3 rounded-full glass-card hover:scale-110 active:scale-95 transition-all z-50 text-slate-500 dark:text-slate-400 hover:text-primary shadow-lg"
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl text-center space-y-8"
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-primary/20 rounded-full animate-float">
                <Heart size={80} className="text-primary fill-primary/30" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-slate-400 dark:to-white">
              HeartGuard AI
            </h1>
            <p className="text-xl text-slate-700 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
              Advanced machine learning analysis for personalized heart health assessment. 
              Get your results in seconds with 87%+ accuracy.
            </p>
            <button
              onClick={() => setView('form')}
              className="btn-primary text-lg px-10 py-4 flex items-center gap-3 mx-auto mt-10 group"
            >
              Analyze Risk Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-4xl glass-card p-8 md:p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setView('landing')}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-slate-600 dark:text-slate-400"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Clinical Assessment</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Please provide the medical data from your records.</p>
              </div>
            </div>

            <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Age */}
              <div className="space-y-1">
                <label className="form-label font-bold">Patient Age</label>
                <input 
                  type="number" name="Age" min="1" max="120"
                  value={formData.Age} onChange={handleChange}
                  className="glass-input w-full" required 
                />
              </div>

              {/* Sex */}
              <div className="space-y-1">
                <label className="form-label font-bold">Sex</label>
                <select name="Sex" value={formData.Sex} onChange={handleChange} className="glass-input w-full">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              {/* Chest Pain Type */}
              <div className="space-y-1">
                <label className="form-label font-bold">Chest Pain Type</label>
                <select name="ChestPainType" value={formData.ChestPainType} onChange={handleChange} className="glass-input w-full">
                  <option value="TA">Typical Angina</option>
                  <option value="ATA">Atypical Angina</option>
                  <option value="NAP">Non-Anginal Pain</option>
                  <option value="ASY">Asymptomatic</option>
                </select>
              </div>

              {/* Resting BP */}
              <div className="space-y-1">
                <label className="form-label font-bold">Resting Blood Pressure</label>
                <input 
                  type="number" name="RestingBP"
                  value={formData.RestingBP} onChange={handleChange}
                  className="glass-input w-full"
                />
              </div>

              {/* Cholesterol */}
              <div className="space-y-1">
                <label className="form-label font-bold">Cholesterol (mg/dl)</label>
                <input 
                  type="number" name="Cholesterol"
                  value={formData.Cholesterol} onChange={handleChange}
                  className="glass-input w-full"
                />
              </div>

              {/* Fasting BS */}
              <div className="space-y-1">
                <label className="form-label font-bold">Fasting Blood Sugar {'>'} 120</label>
                <div className="flex gap-4 p-2 text-slate-800 dark:text-slate-300 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="FastingBS" value="0" 
                      checked={formData.FastingBS === 0} 
                      onChange={() => setFormData(p => ({...p, FastingBS: 0}))}
                      className="accent-primary w-4 h-4"
                    />
                    <span>Normal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="FastinBS" value="1" 
                      checked={formData.FastingBS === 1}
                      onChange={() => setFormData(p => ({...p, FastingBS: 1}))}
                      className="accent-primary w-4 h-4"
                    />
                    <span>Elevated</span>
                  </label>
                </div>
              </div>

              {/* Resting ECG */}
              <div className="space-y-1">
                <label className="form-label font-bold">Resting ECG</label>
                <select name="RestingECG" value={formData.RestingECG} onChange={handleChange} className="glass-input w-full">
                  <option value="Normal">Normal</option>
                  <option value="ST">ST-T Abnormality</option>
                  <option value="LVH">LV Hypertrophy</option>
                </select>
              </div>

              {/* Max HR */}
              <div className="space-y-1">
                <label className="form-label font-bold">Max Heart Rate</label>
                <input 
                   type="number" name="MaxHR"
                   value={formData.MaxHR} onChange={handleChange}
                   className="glass-input w-full"
                />
              </div>

              {/* Exercise Angina */}
              <div className="space-y-1">
                <label className="form-label font-bold">Exercise Angina</label>
                <div className="flex gap-4 p-2 text-slate-800 dark:text-slate-300 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="ExerciseAngina" value="N" 
                      checked={formData.ExerciseAngina === 'N'} 
                      onChange={handleChange}
                      className="accent-primary w-4 h-4"
                    />
                    <span>No</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="ExerciseAngina" value="Y" 
                      checked={formData.ExerciseAngina === 'Y'} 
                      onChange={handleChange}
                      className="accent-primary w-4 h-4"
                    />
                    <span>Yes</span>
                  </label>
                </div>
              </div>

              {/* Oldpeak */}
              <div className="space-y-1">
                <label className="form-label font-bold">Oldpeak (ST Depres.)</label>
                <input 
                  type="number" name="Oldpeak" step="0.1"
                  value={formData.Oldpeak} onChange={handleChange}
                  className="glass-input w-full"
                />
              </div>

              {/* ST Slope */}
              <div className="space-y-1">
                <label className="form-label font-bold">ST Slope Segment</label>
                <select name="ST_Slope" value={formData.ST_Slope} onChange={handleChange} className="glass-input w-full">
                  <option value="Up">Upsloping</option>
                  <option value="Flat">Flat</option>
                  <option value="Down">Downsloping</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-3 pt-6 flex justify-end gap-4 border-t border-slate-200 dark:border-white/10 mt-4">
                <button 
                  type="button" 
                  onClick={() => setFormData({Age: 50, Sex: 'M', ChestPainType: 'ATA', RestingBP: 120, Cholesterol: 200, FastingBS: 0, RestingECG: 'Normal', MaxHR: 150, ExerciseAngina: 'N', Oldpeak: 0, ST_Slope: 'Flat'})}
                  className="btn-secondary"
                >
                  Reset
                </button>
                <button type="submit" disabled={loading} className="btn-primary min-w-[150px] flex items-center justify-center gap-2 shadow-lg">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Run Analysis <ChevronRight size={18} /></>
                  )}
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-6 p-4 bg-red-500/20 shadow-inner border border-red-500/50 rounded-lg flex items-center gap-3 text-red-900 dark:text-red-100">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}
          </motion.div>
        )}

        {view === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl glass-card overflow-hidden"
          >
            <div className={`p-8 ${result.prediction === 1 ? 'bg-red-500/10' : 'bg-emerald-500/10'} text-center border-b border-slate-200 dark:border-white/10`}>
              {result.prediction === 1 ? (
                <AlertCircle size={64} className="mx-auto text-red-500 mb-4" />
              ) : (
                <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-4" />
              )}
              <h2 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                {result.prediction === 1 ? 'High Risk' : 'Low Risk'}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium tracking-tight">Heart disease presence predicted with confidence.</p>
            </div>

            <div className="p-8 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-slate-600 dark:text-slate-400 font-bold tracking-wider uppercase text-xs">Risk Confidence</span>
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{(result.probability * 100).toFixed(1)}%</span>
                </div>
                <div className="h-5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden p-1 border border-slate-300 dark:border-white/10 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.probability * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${result.prediction === 1 ? 'bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`}
                  />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10 flex gap-4 shadow-sm">
                <Info className="text-primary shrink-0" size={24} />
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">AI Analysis Summary</h4>
                  <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    Our Random Forest model analysed 15 physiological vectors. {result.prediction === 1 
                      ? 'Based on the input clinical parameters, the system identifies significant patterns correlating with heart disease. Further clinical validation by a cardiologist is highly recommended.' 
                      : 'The analysis shows no strong indicators of heart disease in the provided clinical data. However, preventative lifestyle choices should always be maintained for optimal heart health.'}
                  </p>
                </div>
              </div>

              <button 
                onClick={resetForm}
                className="btn-secondary w-full py-4 text-center font-bold flex items-center justify-center gap-3 transition-colors shadow-md"
              >
                <RefreshCcw size={20} /> Perform New Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <footer className="mt-12 text-slate-600 dark:text-slate-500 text-xs font-bold text-center pb-8 opacity-80">
        <p>© 2026 HeartGuard AI • Clinical Prediction System</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          <Stethoscope size={14} /> For informational purposes only. Consult a physician for diagnosis.
        </p>
      </footer>
    </div>
  );
};

export default App;
