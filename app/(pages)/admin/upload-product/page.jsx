'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductContext } from '@/Context/ProductContext';
import { 
  ArrowLeft, Upload, Package, Image as ImageIcon, CheckCircle, 
  AlertTriangle, Loader2, X
} from 'lucide-react';
import Link from 'next/link';

export default function UploadProductPage() {
  const router = useRouter();
  const { uploadNewProduct, therapyFilters: contextTherapyFilters, dosageFilters: contextDosageFilters } = useProductContext();
  const therapyFilters = contextTherapyFilters;
  const dosageFilters = contextDosageFilters;

  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    therapy: '',
    customTherapy: '',
    dosageForm: '',
    customDosageForm: '',
    packaging: '',
    description: '',
    tag: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleBrochureChange = (e) => {
    const file = e.target.files[0];
    if (file) setBrochureFile(file);
  };

  const clearBrochure = () => setBrochureFile(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'customTherapy' || key === 'customDosageForm') return;
        
        let valueToAppend = formData[key];
        if (key === 'therapy' && formData.therapy === 'custom_other') {
          valueToAppend = formData.customTherapy;
        }
        if (key === 'dosageForm' && formData.dosageForm === 'custom_other') {
          valueToAppend = formData.customDosageForm;
        }
        data.append(key, valueToAppend);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }
      if (brochureFile) {
        data.append('brochure', brochureFile);
      }

      const result = await uploadNewProduct(data);

      if (result.success) {
        setSuccess(true);
        // Clear form after success
        setFormData({
          name: '',
          genericName: '',
          therapy: '',
          customTherapy: '',
          dosageForm: '',
          customDosageForm: '',
          packaging: '',
          description: '',
          tag: '',
        });
        clearImage();
        clearBrochure();
        
        // Optional: Redirect back after 2 seconds
        // setTimeout(() => router.push('/admin'), 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f7] font-['Outfit'] text-[#1a2e1e] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#05330d] border-b border-[#34ec53]/20 shadow-lg" style={{ backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1000px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-white font-bold text-lg tracking-wide">Upload New Product</h1>
          </div>
          <div className="text-white/50 text-xs font-mono">
            NATURA ADMIN
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-10">
        
        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-500" />
            <p className="font-semibold">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-[#eef7ef] border border-[#b8e0c4] text-[#1a5c32] px-6 py-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#2a6e38]" />
              <p className="font-semibold text-sm">Product uploaded successfully! It is now live on the site.</p>
            </div>
            <Link 
              href="/admin"
              className="text-xs font-bold uppercase tracking-wider bg-[#2a6e38] text-white px-4 py-2 rounded-full hover:bg-[#1a4f25] transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        <div className="bg-white rounded-3xl border-2 border-[#ccdece] shadow-[0_18px_50px_-28px_rgba(15,36,21,0.14)] overflow-hidden">
          <div className="bg-gradient-to-r from-[#eef7ef] to-[#f7ede0] p-6 border-b border-[#deeade] flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2a6e38] to-[#1c4d28] flex items-center justify-center shadow-md">
               <Package size={22} className="text-[#c0f0cc]" />
             </div>
             <div>
               <h2 className="text-xl font-extrabold text-[#0e1e12]">Product Details</h2>
               <p className="text-xs text-[#6a7e6c] font-medium mt-1">Fill in the information to add a new product to the catalogue.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Grid 1: Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Product Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ashwagandha Churna"
                  className="w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all placeholder:text-[#a0b0a2]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Generic Name</label>
                <input 
                  type="text" 
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleChange}
                  placeholder="e.g. Withania Somnifera"
                  className="w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all placeholder:text-[#a0b0a2]"
                />
              </div>
            </div>

            {/* Grid 2: Classification */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Therapy Area *</label>
                <div className="relative">
                  <select 
                    name="therapy"
                    required
                    value={formData.therapy}
                    onChange={handleChange}
                    className="appearance-none w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all text-[#1a2e1e] cursor-pointer"
                  >
                    <option value="" disabled>Select Therapy...</option>
                    {therapyFilters.map(filter => (
                      <option key={filter.id} value={filter.id}>{filter.label}</option>
                    ))}
                    <option value="custom_other">Custom (Type your own)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6a8a6e]">
                    ▼
                  </div>
                </div>
                {formData.therapy === 'custom_other' && (
                  <input 
                    type="text" 
                    name="customTherapy"
                    required
                    value={formData.customTherapy}
                    onChange={handleChange}
                    placeholder="Type custom therapy..."
                    className="w-full mt-2 bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#2a6e38] outline-none"
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Dosage Form *</label>
                <div className="relative">
                  <select 
                    name="dosageForm"
                    required
                    value={formData.dosageForm}
                    onChange={handleChange}
                    className="appearance-none w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all text-[#1a2e1e] cursor-pointer"
                  >
                    <option value="" disabled>Select Form...</option>
                    {dosageFilters.map(filter => (
                      <option key={filter.id} value={filter.id}>{filter.label}</option>
                    ))}
                    <option value="custom_other">Custom (Type your own)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6a8a6e]">
                    ▼
                  </div>
                </div>
                {formData.dosageForm === 'custom_other' && (
                  <input 
                    type="text" 
                    name="customDosageForm"
                    required
                    value={formData.customDosageForm}
                    onChange={handleChange}
                    placeholder="Type custom dosage form..."
                    className="w-full mt-2 bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#2a6e38] outline-none"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Packaging</label>
                <input 
                  type="text" 
                  name="packaging"
                  value={formData.packaging}
                  onChange={handleChange}
                  placeholder="e.g. 100g, 200ml Bottle"
                  className="w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all placeholder:text-[#a0b0a2]"
                />
              </div>
            </div>

            {/* Grid 3: Desc & Image */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Description *</label>
                  <textarea 
                    name="description"
                    required
                    rows="6"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed product description, benefits, ingredients..."
                    className="w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all placeholder:text-[#a0b0a2] resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Tag (Optional)</label>
                  <input 
                    type="text" 
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="e.g. Best Seller, New"
                    className="w-full bg-[#fcfdfc] border-2 border-[#dce8de] rounded-xl px-4 py-3 text-sm font-medium focus:border-[#2a6e38] focus:ring-4 focus:ring-[#2a6e38]/10 outline-none transition-all placeholder:text-[#a0b0a2]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Product Brochure (PDF)</label>
                  <div className="flex items-center gap-4">
                    <label className="bg-[#f2faf4] text-[#2a6e38] border-2 border-[#dce8de] px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:bg-[#e4efe5] hover:border-[#2a6e38]/30 transition-all shadow-sm flex items-center gap-2">
                      <Upload size={16} />
                      {brochureFile ? 'Change PDF' : 'Upload PDF'}
                      <input type="file" name="brochure" accept="application/pdf" onChange={handleBrochureChange} className="hidden" />
                    </label>
                    {brochureFile && (
                      <div className="flex items-center gap-2 text-sm text-[#4a5e4c] font-medium bg-white border border-[#dce8de] px-4 py-2 rounded-xl shadow-sm">
                        <span className="truncate max-w-[150px]">{brochureFile.name}</span>
                        <button type="button" onClick={clearBrochure} className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-2 flex flex-col h-full">
                <label className="text-xs font-bold uppercase tracking-widest text-[#6a8a6e]">Product Image</label>
                
                <div className="flex-1 relative bg-[#fcfdfc] border-2 border-dashed border-[#c4d8c6] rounded-2xl hover:bg-[#f6fbf7] hover:border-[#2a6e38]/50 transition-all flex flex-col items-center justify-center p-6 text-center group overflow-hidden">
                  
                  {imagePreview ? (
                    <div className="absolute inset-0 z-10 bg-white">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                        <label className="bg-white text-[#2a6e38] p-2.5 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <Upload size={18} />
                          <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                        <button type="button" onClick={clearImage} className="bg-red-500 text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <AlertTriangle size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-[#eef7ef] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon size={24} className="text-[#2a6e38]" />
                      </div>
                      <p className="font-semibold text-sm text-[#0e1e12]">Upload Image</p>
                      <p className="text-xs text-[#6a8a6e] mt-1 mb-4">PNG, JPG, WEBP up to 5MB</p>
                      <label className="bg-[#2a6e38] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#1c4d28] transition-colors shadow-md">
                        Browse Files
                        <input type="file" name="image" accept="image/*" required onChange={handleImageChange} className="hidden" />
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Submit Bar */}
            <div className="pt-6 border-t border-[#deeade] flex items-center justify-end gap-4">
              <Link 
                href="/admin" 
                className="px-6 py-3 rounded-xl font-bold text-sm text-[#4a5e4c] hover:bg-[#f2faf4] transition-colors"
              >
                Cancel
              </Link>
              <div className={`bg-gradient-to-r from-[#2a6e38] to-[#1c4d28] text-white rounded-xl font-bold text-sm hover:shadow-[0_8px_20px_rgba(42,110,56,0.3)] hover:-translate-y-0.5 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-full px-8 py-3 flex items-center justify-center gap-2 outline-none"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {loading ? 'Uploading...' : 'Upload Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
