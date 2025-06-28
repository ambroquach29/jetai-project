# Jet AI Comparison Tool

A comprehensive web application for comparing private jet specifications using AI-powered analysis. This project combines modern web technologies with machine learning to provide intelligent jet comparisons based on various performance metrics.

## 🚀 Features

- **AI-Powered Jet Comparisons**: Uses OpenAI's language models to analyze and compare jet specifications
- **Real-time Data Processing**: Dynamic comparison of jet performance metrics
- **Modern Web Interface**: Built with Next.js and Tailwind CSS for a responsive user experience
- **GraphQL API**: Efficient data querying with Apollo Server and Hasura
- **Comprehensive Jet Database**: Includes specifications for popular private jets

## 🏗️ Architecture

The project consists of three main components:

### Backend (`/backend`)

- **Express.js Apollo Server** with TypeScript
- **Hasura GraphQL Engine** for database management
- **PostgreSQL** database with Prisma ORM
- **Docker Compose** setup for easy deployment

### Frontend (`/frontend`)

- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **Apollo Client** for GraphQL integration
- **Responsive design** for all devices

### LLM Service (`/llm`)

- **FastAPI** with Python
- **OpenAI Integration** for intelligent jet analysis
- **LangChain** for prompt management
- **CORS-enabled** for cross-origin requests

## 📋 Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- Docker and Docker Compose
- PostgreSQL (via Docker)
- OpenAI API key

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jetai-project
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Database Setup

```bash
# Start PostgreSQL and Hasura
docker-compose up -d

# Run Prisma migrations
npx prisma migrate dev
npx prisma generate
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

### 5. LLM Service Setup

```bash
cd ../llm
# Create virtual environment
python -m venv llm-env
source llm-env/bin/activate  # On Windows: llm-env\Scripts\activate

# Install dependencies
pip install fastapi uvicorn langchain openai pydantic

# Set your OpenAI API key
export OPENAI_API_KEY="your-api-key-here"
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend**:

   ```bash
   cd backend
   npm run dev
   ```

   - GraphQL Playground: http://localhost:5000/graphql
   - Hasura Console: http://localhost:8080

2. **Start the Frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

   - Application: http://localhost:3000

3. **Start the LLM Service**:
   ```bash
   cd llm
   uvicorn main:app --reload --port 8000
   ```
   - API: http://localhost:8000

### Production Mode

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start

# LLM Service
cd llm
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 📊 Available Jet Data

The application includes specifications for various private jets:

- Gulfstream G650
- Bombardier Global 7500
- Cessna Citation Longitude
- Embraer Phenom 300
- Dassault Falcon 7X
- Bombardier Challenger 350
- Gulfstream G280
- HondaJet Elite
- Pilatus PC-24
- Learjet 75 Liberty

Each jet includes data on:

- Wingspan
- Number of engines
- Manufacturing year
- AI-generated performance metrics (top speed, fuel efficiency, maximum seats)

## 🔧 Configuration

### Environment Variables

Create `.env` files in each component directory:

**Backend** (`.env`):

```env
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/postgres"
HASURA_GRAPHQL_ENDPOINT="http://localhost:8080/v1/graphql"
```

**LLM Service** (`.env`):

```env
OPENAI_API_KEY="your-openai-api-key"
```

## 📚 Documentation

For detailed project documentation, architecture diagrams, and implementation details, please refer to:

- **Project Documentation**: [`jetai-project-documentation.pdf`](./jetai-project-documentation.pdf)

## 🧪 API Endpoints

### LLM Service Endpoints

- `POST /api/compare_jets` - Compare jets based on specified criteria
  - Request body: `{ comparisonCategory: string, jets: Array<JetData> }`
  - Returns: Ranked comparison results

### GraphQL Endpoints

- `GET /graphql` - Apollo Server playground
- `POST /graphql` - GraphQL queries and mutations

## 🐳 Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
# Start all services
cd backend
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:

- Check the [documentation PDF](./jetai-project-documentation.pdf)
- Review the GraphQL playground at http://localhost:5000/graphql
- Check the Hasura console at http://localhost:8080

## 🔄 Project Status

- ✅ Backend API with GraphQL
- ✅ Frontend with Next.js
- ✅ LLM integration with OpenAI
- ✅ Database setup with PostgreSQL
- ✅ Docker configuration
- ✅ Basic jet comparison functionality

---

**Note**: Make sure to set up your OpenAI API key before running the LLM service. The application requires an active OpenAI API subscription for the AI-powered jet comparisons to work.
