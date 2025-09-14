import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Eye, X } from 'lucide-react';

const DocumentVerification = ({ theme, verificationForm, setVerificationForm }) => {
  const [uploading, setUploading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const documentOptions = [
    { value: 'passport', label: 'Passport' },
    { value: 'driving_license', label: 'Driving License' },
    { value: 'national_id', label: 'National ID' },
    { value: 'utility_bill', label: 'Utility Bill' },
    { value: 'bank_statement', label: 'Bank Statement' }
  ];

  const handleDocumentTypeChange = (e) => {
    setVerificationForm({...verificationForm, documentType: e.target.value});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only JPEG, PNG, JPG, or PDF files.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }

      setVerificationForm({...verificationForm, documentFile: file});
      
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const uploadToCloudinary = async () => {
    if (!verificationForm?.documentFile || !verificationForm?.documentType) {
      alert("Please select a document type and file first.");
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock URL (in real app, this would come from Cloudinary response)
      const mockUrl = `https://res.cloudinary.com/demo/image/upload/v1641291234/documents/${Date.now()}_${verificationForm?.documentFile.name}`;
      
      // Update state with the URL and mark as uploaded
      const updatedForm = {
        ...verificationForm, 
        documentUrl: mockUrl, 
        uploaded: true,
        verified: false,
        uploadedAt: new Date().toISOString(),
        fileName: verificationForm?.documentFile.name,
        fileSize: verificationForm?.documentFile.size,
        status: 'pending_review'
      };
      
      setVerificationForm(updatedForm);
      
      // Save to localStorage (in real app, this would be saved to backend)
      if (typeof window !== 'undefined') {
        localStorage.setItem('walletVerification', JSON.stringify(updatedForm));
      }
      
      alert("Document uploaded successfully! Your verification is pending admin approval.");
      
      // Simulate admin verification after 10 seconds for demo
      setTimeout(() => {
        const verifiedForm = {
          ...updatedForm,
          verified: true,
          status: 'verified',
          verifiedAt: new Date().toISOString()
        };
        setVerificationForm(verifiedForm);
        if (typeof window !== 'undefined') {
          localStorage.setItem('walletVerification', JSON.stringify(verifiedForm));
        }
        alert("Your documents have been verified! You can now add a wallet.");
      }, 10000);
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const viewDocument = () => {
    if (verificationForm?.documentUrl) {
      window.open(verificationForm?.documentUrl, '_blank');
    }
  };

  const reuploadDocument = () => {
    setVerificationForm({
      ...verificationForm,
      documentFile: null,
      documentUrl: '',
      uploaded: false,
      verified: false,
      status: 'not_uploaded'
    });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return theme === 'light' ? 'text-green-600' : 'text-green-400';
      case 'pending_review':
        return theme === 'light' ? 'text-yellow-600' : 'text-yellow-400';
      case 'rejected':
        return theme === 'light' ? 'text-red-600' : 'text-red-400';
      default:
        return theme === 'light' ? 'text-gray-600' : 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5" />;
      case 'pending_review':
        return <AlertCircle className="w-5 h-5" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  // Theme-specific classes
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  return (
    <div className="space-y-6">
      {/* Current Status */}
      {verificationForm?.uploaded && (
        <div className={`rounded-xl p-4 border ${
          verificationForm?.verified
            ? theme === 'light' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-green-900/30 border-green-700/50'
            : theme === 'light'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-yellow-900/30 border-yellow-700/50'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={getStatusColor(verificationForm?.status)}>
              {getStatusIcon(verificationForm?.status)}
            </div>
            <div>
              <h4 className={`font-medium ${getStatusColor(verificationForm?.status)}`}>
                {verificationForm?.verified ? 'Verified' : 'Under Review'}
              </h4>
              <p className={`text-sm ${
                verificationForm?.verified
                  ? theme === 'light' ? 'text-green-600' : 'text-green-400'
                  : theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
              }`}>
                {verificationForm?.verified 
                  ? `Verified on ${new Date(verificationForm?.verifiedAt).toLocaleDateString()}`
                  : `Uploaded on ${new Date(verificationForm?.uploadedAt).toLocaleDateString()}`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Document Upload Form */}
      {!verificationForm?.uploaded ? (
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
            }`}>
              Document Type *
            </label>
            <select
              value={verificationForm?.documentType}
              onChange={handleDocumentTypeChange}
              className={`w-full p-3 rounded-lg border transition-colors ${
                theme === 'light'
                  ? 'bg-white border-[#d2d7dd] text-[#38537a] focus:border-blue-500'
                  : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              required
            >
              <option value="">Select document type</option>
              {documentOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
            }`}>
              Upload Document *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                theme === 'light'
                  ? 'border-gray-300 hover:border-blue-400 bg-gray-50'
                  : 'border-slate-600 hover:border-blue-400 bg-slate-700/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className={`w-8 h-8 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div className={`text-sm ${
                  theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'
                }`}>
                  {verificationForm?.documentFile ? (
                    <div>
                      <p className="font-medium">{verificationForm?.documentFile.name}</p>
                      <p className={`text-xs ${
                        theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                      }`}>
                        {(verificationForm?.documentFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>Click to upload or drag and drop</p>
                      <p className={`text-xs ${
                        theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                      }`}>
                        PNG, JPG, JPEG, PDF (max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className={`rounded-lg border p-4 ${
              theme === 'light' 
                ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}` 
                : 'bg-slate-700/30 border-slate-600'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${
                  theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'
                }`}>
                  Preview
                </h4>
                <button
                  onClick={() => setShowImagePreview(!showImagePreview)}
                  className={`p-1 rounded ${
                    theme === 'light' 
                      ? 'hover:bg-gray-200' 
                      : 'hover:bg-slate-600'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              {showImagePreview && (
                <img 
                  src={previewUrl} 
                  alt="Document preview" 
                  className="max-w-full h-48 object-contain rounded border"
                />
              )}
            </div>
          )}

          <button
            onClick={uploadToCloudinary}
            disabled={uploading || !verificationForm?.documentFile || !verificationForm?.documentType}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              uploading || !verificationForm?.documentFile || !verificationForm?.documentType
                ? theme === 'light'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : theme === 'light'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload Document'
            )}
          </button>
        </div>
      ) : (
        /* Uploaded Document Details */
        <div className="space-y-4">
          <div className={`rounded-lg border p-4 ${
            theme === 'light' 
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}` 
              : 'bg-slate-700/30 border-slate-600'
          }`}>
            <h4 className={`font-medium mb-3 ${
              theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'
            }`}>
              Uploaded Document
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  Type:
                </span>
                <span className={theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}>
                  {documentOptions.find(opt => opt.value === verificationForm?.documentType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  File:
                </span>
                <span className={theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}>
                  {verificationForm?.fileName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  Size:
                </span>
                <span className={theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}>
                  {(verificationForm?.fileSize / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  Status:
                </span>
                <span className={getStatusColor(verificationForm?.status)}>
                  {verificationForm?.status?.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={viewDocument}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors border ${
                theme === 'light'
                  ? 'bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:bg-[#dee2e6]'
                  : 'bg-slate-700/30 border-slate-600/30 text-blue-300 hover:bg-slate-700/50'
              }`}
            >
              View Document
            </button>
            {!verificationForm?.verified && (
              <button
                onClick={reuploadDocument}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors border ${
                  theme === 'light'
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                    : 'bg-red-900/30 border-red-700/50 text-red-400 hover:bg-red-900/50'
                }`}
              >
                Re-upload
              </button>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className={`rounded-lg p-4 ${
        theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-900/30 border border-blue-700/50'
      }`}>
        <h4 className={`font-medium mb-2 ${
          theme === 'light' ? 'text-blue-800' : 'text-blue-300'
        }`}>
          Document Guidelines
        </h4>
        <ul className={`text-sm space-y-1 ${
          theme === 'light' ? 'text-blue-700' : 'text-blue-400'
        }`}>
          <li>• Document must be clear and readable</li>
          <li>• All corners and edges must be visible</li>
          <li>• No blurred or damaged documents</li>
          <li>• Document must be current and valid</li>
          <li>• Personal information must be clearly visible</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentVerification;