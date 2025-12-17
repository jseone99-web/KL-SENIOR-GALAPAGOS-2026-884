import React, { useState, useCallback } from 'react';
import { MOCK_CANDIDATE } from './constants';
import { AppState, CandidateDossier } from './types';
import { LogoHeader } from './components/LogoHeader';
import { InputField } from './components/InputField';
import { analyzeMotivation, generateHostMessage } from './services/geminiService';
import { CheckCircle, AlertCircle, ArrowRight, Flame, UploadCloud } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [formData, setFormData] = useState<CandidateDossier>(MOCK_CANDIDATE);
  const [hostMessage, setHostMessage] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{ score: number; advice: string } | null>(null);

  // Initial fake login
  const handleLogin = useCallback(async () => {
    const msg = await generateHostMessage(MOCK_CANDIDATE.firstName);
    setHostMessage(msg);
    setAppState(AppState.DASHBOARD);
  }, []);

  // Form Handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // AI Analysis of Motivation Letter
  const handleAnalyze = async () => {
    if (!formData.motivationLetter || formData.motivationLetter.length < 20) return;
    
    setIsAnalyzing(true);
    const feedback = await analyzeMotivation(formData.motivationLetter);
    setAiFeedback(feedback);
    setIsAnalyzing(false);
  };

  // Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppState(AppState.SUCCESS);
  };

  return (
    <div className="min-h-screen bg-jungle bg-cover bg-fixed bg-no-repeat font-body text-koh-sand overflow-x-hidden selection:bg-koh-orange selection:text-white">
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-12">
        <LogoHeader />

        {/* VIEW: LOGIN */}
        {appState === AppState.LOGIN && (
          <div className="flex flex-col items-center animate-fadeIn mt-8">
            <div className="bg-koh-brown/40 backdrop-blur-md p-8 rounded-xl border border-koh-orange/30 shadow-2xl max-w-md w-full text-center">
              <h2 className="font-tribal text-2xl mb-6 text-koh-gold">Espace Candidat</h2>
              <p className="mb-6 text-lg">Veuillez vérifier vos informations de pré-inscription puis terminer la saisie de votre candidature</p>
              
              <div className="text-left bg-koh-dark/50 p-4 rounded mb-6 border-l-4 border-koh-orange">
                <p className="text-sm text-gray-400 uppercase text-xs tracking-wider mb-1">Dossier pré-identifié</p>
                <p className="font-bold text-xl">{MOCK_CANDIDATE.firstName} {MOCK_CANDIDATE.lastName}</p>
                <p className="text-koh-orange">{MOCK_CANDIDATE.id}</p>
              </div>

              <button 
                onClick={handleLogin}
                className="group w-full bg-gradient-to-r from-koh-orange to-koh-red text-white font-tribal font-bold text-xl py-4 px-6 rounded shadow-[0_0_15px_rgba(255,140,0,0.5)] hover:shadow-[0_0_25px_rgba(255,140,0,0.8)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Flame className="w-6 h-6 animate-pulse" />
                Accéder au Dossier
              </button>
            </div>
          </div>
        )}

        {/* VIEW: DASHBOARD */}
        {appState === AppState.DASHBOARD && (
          <div className="animate-slideUp">
            {/* Host Message */}
            {hostMessage && (
              <div className="bg-koh-gold/10 border-l-4 border-koh-gold p-4 mb-8 rounded backdrop-blur-sm">
                <p className="italic text-lg text-koh-sand font-serif">"{hostMessage}"</p>
                <p className="text-right text-xs uppercase font-bold text-koh-orange mt-2">- Denis</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-koh-dark/80 backdrop-blur-md p-6 md:p-10 rounded-xl border border-koh-brown shadow-2xl">
              
              {/* Section 1: Pre-filled Info */}
              <div className="mb-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <h3 className="font-tribal text-2xl text-koh-sand border-b border-koh-brown pb-2 mb-6 flex items-center gap-3">
                  <CheckCircle className="text-green-500" /> Informations Validées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-3 rounded border border-koh-brown/30">
                    <span className="block text-xs uppercase text-koh-orange">Nom Complet</span>
                    <span className="text-lg">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-koh-brown/30">
                    <span className="block text-xs uppercase text-koh-orange">Âge</span>
                    <span className="text-lg">{formData.age} ans</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-koh-brown/30">
                    <span className="block text-xs uppercase text-koh-orange">Adresse</span>
                    <span className="text-lg">{formData.address}</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-koh-brown/30">
                    <span className="block text-xs uppercase text-koh-orange">Code Postal</span>
                    <span className="text-lg">{formData.postalCode}</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-koh-brown/30">
                    <span className="block text-xs uppercase text-koh-orange">Ville</span>
                    <span className="text-lg">{formData.city}</span>
                  </div>
                  <div className="bg-black/30 p-3 rounded border border-koh-brown/30">
                    <span className="block text-xs uppercase text-koh-orange">Profession</span>
                    <span className="text-lg">{formData.profession}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Missing Info */}
              <div className="mb-8">
                <h3 className="font-tribal text-2xl text-koh-gold border-b-2 border-koh-gold pb-2 mb-6 flex items-center gap-3">
                  <AlertCircle className="text-koh-orange animate-bounce" /> Informations Manquantes
                </h3>
                
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="Numéro de Passeport" 
                      name="passportNumber" 
                      value={formData.passportNumber || ''} 
                      onChange={handleInputChange}
                      placeholder="ex: 18XX55555"
                      required
                    />
                    <InputField 
                      label="Niveau de Natation" 
                      name="swimLevel" 
                      type="select"
                      value={formData.swimLevel || ''} 
                      onChange={handleInputChange}
                      options={['Novice', 'Intermédiaire', 'Expert']}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <InputField 
                      label="Contact Urgence (Nom + Tél)" 
                      name="emergencyContact" 
                      value={formData.emergencyContact || ''} 
                      onChange={handleInputChange}
                      placeholder="ex: Marie Dubois 06..."
                      required
                    />
                    <InputField 
                      label="Médecin Traitant" 
                      name="doctorName" 
                      value={formData.doctorName || ''} 
                      onChange={handleInputChange}
                      placeholder="ex: Dr. House"
                      required
                    />
                  </div>

                  <InputField 
                    label="Antécédents Médicaux / Traitements" 
                    name="medicalStatus" 
                    type="textarea"
                    value={formData.medicalStatus || ''} 
                    onChange={handleInputChange}
                    placeholder="Listez ici vos traitements en cours ou RAS..."
                    required
                  />

                  {/* Upload Photos Field - Modified for 2 files */}
                  <div className="mb-6">
                    <label className="block font-tribal text-koh-gold text-lg mb-2 uppercase tracking-wide">
                      Ajouter vos photos (de pied en tête, de face et de profil en maillot) <span className="text-koh-red">*</span>
                    </label>
                    <p className="text-sm text-gray-400 mb-2 italic">Veuillez joindre 2 photos distinctes.</p>
                    <div className="flex flex-col gap-4">
                      {/* File 1 */}
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          className="w-full bg-koh-dark/50 border-2 border-koh-brown text-koh-sand p-3 rounded-lg focus:outline-none focus:border-koh-orange file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-koh-orange file:text-white hover:file:bg-koh-red cursor-pointer transition-all"
                        />
                        <UploadCloud className="absolute right-4 top-3.5 text-koh-orange pointer-events-none" />
                      </div>
                      {/* File 2 */}
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          className="w-full bg-koh-dark/50 border-2 border-koh-brown text-koh-sand p-3 rounded-lg focus:outline-none focus:border-koh-orange file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-koh-orange file:text-white hover:file:bg-koh-red cursor-pointer transition-all"
                        />
                        <UploadCloud className="absolute right-4 top-3.5 text-koh-orange pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <InputField 
                      label="Pourquoi Koh Lanta Senior ? (Motivation)" 
                      name="motivationLetter" 
                      type="textarea"
                      value={formData.motivationLetter || ''} 
                      onChange={handleInputChange}
                      placeholder="Exprimez votre esprit d'aventure..."
                      required
                    />
                    
                    <button 
                      type="button"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !formData.motivationLetter}
                      className="absolute bottom-4 right-4 text-xs bg-koh-orange hover:bg-koh-red text-white px-3 py-1 rounded transition-colors disabled:opacity-50"
                    >
                      {isAnalyzing ? "Analyse en cours..." : "Analyser ma motivation avec IA"}
                    </button>
                  </div>

                  {/* AI Feedback Area */}
                  {aiFeedback && (
                    <div className="bg-koh-brown/50 border border-koh-gold/50 rounded p-4 mt-2 animate-fadeIn">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-tribal text-koh-gold">Score Aventure :</span>
                        <div className="h-4 w-32 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-1000" 
                            style={{ width: `${aiFeedback.score}%` }}
                          />
                        </div>
                        <span className="font-bold">{aiFeedback.score}/100</span>
                      </div>
                      <p className="text-sm italic text-gray-300">" {aiFeedback.advice} "</p>
                    </div>
                  )}

                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-start gap-3 mb-6 p-4 bg-koh-brown/30 rounded border border-koh-brown/50 hover:bg-koh-brown/40 transition-colors">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    required 
                    className="mt-1 w-5 h-5 accent-koh-orange cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-sm md:text-base cursor-pointer select-none text-koh-sand/90">
                    En validant mon dossier j'autorise TF1 et ses partenaires à utiliser mes données dans le cadre de mon inscription à Koh Lanta Senior - Galapagos
                  </label>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="bg-koh-gold text-koh-brown font-tribal font-black text-xl py-4 px-12 rounded hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.4)] flex items-center gap-3"
                  >
                    VALIDER MON DOSSIER <ArrowRight />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* VIEW: SUCCESS */}
        {appState === AppState.SUCCESS && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fadeIn text-center">
             <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,0,0.4)]">
                <CheckCircle className="w-12 h-12 text-white" />
             </div>
             <h2 className="font-tribal text-4xl text-koh-gold mb-4">Dossier Transmis !</h2>
             <p className="text-xl max-w-lg mx-auto leading-relaxed">
               Merci {formData.firstName}. Le conseil va étudier votre candidature.<br/>
               Préparez votre sac, l'aventure ne fait que commencer.
             </p>
             <button 
               onClick={() => window.location.reload()}
               className="mt-12 text-koh-orange hover:text-white underline underline-offset-4"
             >
               Retour à l'accueil
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;