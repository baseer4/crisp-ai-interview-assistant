import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, FileCheck, AlertCircle, Loader2 } from "lucide-react"
import { useResumeStore } from "../store/useResumeStore"

export default function ResumeUploadPage() {
  const navigate = useNavigate();
  const { 
    file,
    resumeData, 
    isLoading, 
    error, 
    setFile,
    parseResume,
    reset,
    updateResumeField
  } = useResumeStore()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // auto parse when file is selected
      parseResume()
    }
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : resumeData ? (
              <FileCheck className="w-5 h-5 text-green-500" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            Upload Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input 
              type="file" 
              accept=".pdf,.docx" 
              onChange={handleFileChange}
              disabled={isLoading}
              className={error ? 'border-red-500' : ''}
            />
            {file && !error && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {file.name}
              </p>
            )}
          </div>

          {isLoading && (
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Parsing resume...
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {resumeData && (
            <div className="p-4 bg-gray-100 rounded-xl space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-semibold">Name</label>
                <Input
                  value={resumeData.name || ""}
                  onChange={(e) => updateResumeField("name", e.target.value)}
                  placeholder="Enter name"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Email</label>
                <Input
                  value={resumeData.email || ""}
                  onChange={(e) => updateResumeField("email", e.target.value)}
                  placeholder="Enter email"
                  type="email"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Phone</label>
                <Input
                  value={resumeData.phone || ""}
                  onChange={(e) => updateResumeField("phone", e.target.value)}
                  placeholder="Enter 10 digit phone number"
                  className="bg-white"
                  maxLength={10}
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                      e.preventDefault();
                    }
                  }}
                />
                {resumeData.phone && resumeData.phone.length < 10 && (
                  <p className="text-xs text-orange-500 mt-1">Please enter a 10-digit phone number</p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {!resumeData && (
              <Button 
                variant="default" 
                onClick={() => parseResume()}
                disabled={!file || isLoading}
              >
                {isLoading ? 'Processing...' : 'Parse Resume'}
              </Button>
            )}
            
            {resumeData && (
              <div className="flex gap-2">
                <Button 
                  variant="default"
                  className="flex-1"
                  onClick={() => navigate('/chat')}
                  disabled={!resumeData.name || !resumeData.email || !resumeData.phone || resumeData.phone.length < 10}
                >
                  Continue to Chat
                </Button>
                <Button 
                  variant="outline"
                  className="text-white" 
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
