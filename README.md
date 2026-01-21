# 🦷 Lesion Detection Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A modern web interface for diagnosing lesions in panoramic dental radiographs using AI-powered object detection and segmentation models.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Project Structure](#-project-structure) • [API Reference](#-api-reference)

</div>

---

## 📋 Overview

This frontend application provides an intuitive interface for dental lesion detection in panoramic radiographs. It connects to a FastAPI backend that leverages YOLO-based models (YOLOv8, YOLOv12, RT-DETR) for detecting and segmenting various dental lesions including:

- **Radiolucent lesions** (dark areas in radiographs)
- **Radiopaque lesions** (bright areas in radiographs)
- **Dentigerous cysts**
- **Keratocysts**
- **Radicular cysts**
- **Ameloblastoma**
- **Odontoma**

---

## ✨ Features

### 🔍 Lesion Prediction
- **Test Image Selection**: Choose from pre-loaded test images for quick inference
- **Custom Image Upload**: Upload your own panoramic radiograph images
- **Ground Truth Comparison**: Upload YOLO-format label files for visual comparison
- **Adjustable Confidence Threshold**: Fine-tune detection sensitivity (0-1)

### 📊 Results Visualization
- **Prediction Overlay**: View detected lesions with bounding boxes/masks
- **Ground Truth Display**: Compare predictions against labeled ground truth
- **Overlay View**: Side-by-side comparison of predictions and ground truth
- **Confidence Charts**: Visualize detection confidence scores
- **Inference Time Display**: Monitor model performance metrics

### 🤖 Model Management
- **Multiple Model Support**: Switch between different trained models
- **Custom Model Upload**: Upload your own `.pt` model files
- **Model Information**: View detailed model specifications including:
  - Task type (detection/segmentation)
  - Image size, layers, parameters
  - GFLOPs (computational complexity)

### 📈 Model Analytics
- **Performance Metrics**: View precision, recall, mAP50, mAP50-95
- **Per-Class Metrics**: Detailed breakdown by lesion type
- **Box vs Mask Metrics**: Compare bounding box and segmentation performance
- **Training Visualizations**: View loss curves and performance graphs

### 📚 Dataset Information
- **Dataset Statistics**: Explore training, validation, and test splits
- **Class Distribution**: Visualize lesion type distribution
- **Distribution Charts**: Interactive dataset visualization

---

## 🛠 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **pnpm** >= 8.0.0
- **Backend API** running (see [Backend Repository](#-related))

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in project root
   echo 'VITE_API_BASE_URL="http://127.0.0.1:8000"' > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🚀 Usage

### Making Predictions

1. **Select a Model**: Choose from available models in the dropdown
2. **Choose an Image**:
   - **Select Mode**: Pick from pre-loaded test images
   - **Upload Mode**: Toggle switch and upload your own image
3. **Set Confidence Score**: Adjust threshold (default: 0.5)
4. **Click Predict**: View results with detection overlays

### Uploading Custom Models

1. Enter a unique **Model Name** (e.g., `yolov11l-seg`)
2. Click **Upload Model**
3. Select your `.pt` file
4. Model will be available in the dropdown after upload

### Uploading Ground Truth Labels

1. Switch to **Upload Mode**
2. Upload your image
3. Click **Upload Label** and select your `.txt` file
4. **Supported Formats**:
   - YOLO polygon format (segmentation)
   - YOLO bounding box format (object detection)
   - One object per line

---

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets (dataset images, etc.)
├── src/
│   ├── api/                    # API service functions
│   │   └── index.ts           # API endpoints (fetch models, predict, etc.)
│   ├── assets/                 # Application assets
│   ├── components/             # React components
│   │   ├── ui/                # Reusable UI components (shadcn/ui)
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   └── tooltip.tsx
│   │   ├── Footer.tsx         # Application footer
│   │   ├── Form.tsx           # Main prediction form
│   │   ├── Layout.tsx         # Page layout wrapper
│   │   ├── ModelCart.tsx      # Model information card
│   │   ├── ModelCartContainer.tsx
│   │   ├── ModelForm.tsx      # Model selection/upload form
│   │   ├── ModelGraphics.tsx  # Training visualization charts
│   │   ├── ModelInfo.tsx      # Model specifications display
│   │   ├── ModelMetrics.tsx   # Performance metrics table
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── PredictResults.tsx # Prediction results display
│   │   └── SelectImage.tsx    # Image selection/upload component
│   ├── hooks/                  # Custom React hooks
│   │   ├── useImages.ts       # Fetch available test images
│   │   ├── useModelDetail.ts  # Fetch model details & metrics
│   │   ├── useModels.ts       # Fetch available models
│   │   ├── usePredict.ts      # Handle predictions
│   │   └── useUploadModel.ts  # Handle model uploads
│   ├── lib/                    # Utility libraries
│   ├── pages/                  # Page components
│   │   ├── DatasetsAbout.tsx  # Dataset information page
│   │   └── ModelsAbout.tsx    # Model comparison page
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts           # Shared type interfaces
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind config
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── components.json            # shadcn/ui configuration
├── eslint.config.js           # ESLint configuration
├── index.html                  # HTML entry point
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

---

## 🌐 API Reference

The frontend communicates with a FastAPI backend. Here are the main endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/get/models` | GET | Fetch list of available models |
| `/get/test-images` | GET | Fetch list of test images |
| `/get/models-info/?model_name=` | GET | Fetch model details & metrics |
| `/predict/test?model_name=&image_name=&conf_threshold=` | GET | Run inference on test image |
| `/predict/upload` | POST | Run inference on uploaded image |
| `/load/model` | POST | Upload a new model file |

### Response Types

```typescript
// Prediction Response
interface InferenceResponse {
  gt_image?: string;          // Base64 ground truth image
  pred_image: string;         // Base64 prediction image
  overlay_image?: string;     // Base64 overlay image
  confidence_chart: string;   // Base64 confidence chart
  inference_time: number;     // Inference time in seconds
  predictions: Prediction[];  // List of detections
  gt_warning?: string;        // Warning if GT format is incorrect
}

// Model Detail Response
interface ModelDetailResponse {
  model: string;
  model_info: ModelInfoType;
  metrics: Metrics;
  graphics: GraphicItem[];
}
```

---

## 🛤 Routing

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `App` | Main prediction interface |
| `/models-about` | `ModelsAbout` | Model comparison & metrics |
| `/datasets-about` | `DatasetsAbout` | Dataset statistics & distribution |

---

## 📦 Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🧰 Tech Stack

### Core
- **React 19** - UI library with latest features
- **TypeScript 4.9** - Type-safe JavaScript
- **Vite 7** - Next-generation frontend tooling

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **tw-animate-css** - Animation utilities
- **shadcn/ui** - Beautifully designed components

### UI Components
- **Radix UI** - Unstyled, accessible components
  - Accordion, Label, Select, Separator
  - Slot, Switch, Tooltip
- **Lucide React** - Beautiful icons
- **class-variance-authority** - Component variants

### Routing
- **React Router 7** - Client-side routing

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **@vitejs/plugin-react-swc** - Fast React refresh with SWC

---

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend API base URL |

### Path Aliases

The project uses `@` as an alias for the `src` directory:

```typescript
// Instead of relative imports
import Component from '../../../components/Component';

// Use path alias
import Component from '@/components/Component';
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is part of an academic project at Yıldız Technical University.

---

## 🔗 Related

- **Backend Repository**: Contains the FastAPI server and ML models
- **YOLO Documentation**: [Ultralytics YOLO](https://docs.ultralytics.com/)
- **shadcn/ui**: [Component Library](https://ui.shadcn.com/)

---

<div align="center">

Şahin Doğruca | Kıvanç Erdem Sarıkamış | Hamza Osman İlhan

</div>
