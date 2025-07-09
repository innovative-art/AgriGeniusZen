import {
  User, InsertUser,
  Crop, InsertCrop,
  SoilData, InsertSoilData,
  WeatherData, InsertWeatherData,
  MarketData, InsertMarketData,
  DiseaseRecord, InsertDiseaseRecord,
  GovernmentScheme, InsertGovernmentScheme,
  Settings, InsertSettings
} from "@shared/schema";

// Interface defining all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Crop operations
  getCrop(id: number): Promise<Crop | undefined>;
  getCropsByUser(userId: number): Promise<Crop[]>;
  getCurrentCrop(userId: number): Promise<Crop | undefined>;
  createCrop(crop: InsertCrop): Promise<Crop>;
  updateCrop(id: number, crop: Partial<Crop>): Promise<Crop | undefined>;
  deleteCrop(id: number): Promise<boolean>;
  
  // Soil data operations
  getSoilData(id: number): Promise<SoilData | undefined>;
  getSoilDataByCrop(cropId: number): Promise<SoilData | undefined>;
  getCurrentSoilData(userId: number): Promise<SoilData | undefined>;
  createSoilData(soilData: InsertSoilData): Promise<SoilData>;
  
  // Weather data operations
  getWeatherData(id: number): Promise<WeatherData | undefined>;
  getWeatherDataByUser(userId: number): Promise<WeatherData | undefined>;
  getWeatherDataByLocation(location: string): Promise<WeatherData | undefined>;
  createWeatherData(weatherData: InsertWeatherData): Promise<WeatherData>;
  
  // Market data operations
  getMarketData(id: number): Promise<MarketData | undefined>;
  getMarketDataByCrop(cropName: string): Promise<MarketData | undefined>;
  getAllMarketData(): Promise<MarketData[]>;
  createMarketData(marketData: InsertMarketData): Promise<MarketData>;
  updateMarketData(id: number, marketData: Partial<MarketData>): Promise<MarketData | undefined>;
  
  // Disease record operations
  getDiseaseRecord(id: number): Promise<DiseaseRecord | undefined>;
  getDiseaseRecordsByCrop(cropId: number): Promise<DiseaseRecord[]>;
  createDiseaseRecord(diseaseRecord: InsertDiseaseRecord): Promise<DiseaseRecord>;
  
  // Government scheme operations
  getGovernmentScheme(id: number): Promise<GovernmentScheme | undefined>;
  getAllGovernmentSchemes(): Promise<GovernmentScheme[]>;
  createGovernmentScheme(scheme: InsertGovernmentScheme): Promise<GovernmentScheme>;
  
  // Settings operations
  getSettings(userId: number): Promise<Settings | undefined>;
  createSettings(settings: InsertSettings): Promise<Settings>;
  updateSettings(userId: number, settings: Partial<Settings>): Promise<Settings | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private crops: Map<number, Crop>;
  private soilData: Map<number, SoilData>;
  private weatherData: Map<number, WeatherData>;
  private marketData: Map<number, MarketData>;
  private diseaseRecords: Map<number, DiseaseRecord>;
  private governmentSchemes: Map<number, GovernmentScheme>;
  private settings: Map<number, Settings>;
  
  private userId: number = 1;
  private cropId: number = 1;
  private soilDataId: number = 1;
  private weatherDataId: number = 1;
  private marketDataId: number = 1;
  private diseaseRecordId: number = 1;
  private governmentSchemeId: number = 1;
  private settingsId: number = 1;
  
  constructor() {
    this.users = new Map();
    this.crops = new Map();
    this.soilData = new Map();
    this.weatherData = new Map();
    this.marketData = new Map();
    this.diseaseRecords = new Map();
    this.governmentSchemes = new Map();
    this.settings = new Map();
    
    // Initialize with some sample data
    this.initSampleData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const newUser: User = { ...user, id, createdAt: new Date() };
    this.users.set(id, newUser);
    return newUser;
  }
  
  async updateUser(id: number, user: Partial<User>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;
    
    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Crop operations
  async getCrop(id: number): Promise<Crop | undefined> {
    return this.crops.get(id);
  }
  
  async getCropsByUser(userId: number): Promise<Crop[]> {
    return Array.from(this.crops.values()).filter(
      (crop) => crop.userId === userId
    );
  }
  
  async getCurrentCrop(userId: number): Promise<Crop | undefined> {
    const userCrops = await this.getCropsByUser(userId);
    return userCrops.length > 0 ? userCrops[0] : undefined;
  }
  
  async createCrop(crop: InsertCrop): Promise<Crop> {
    const id = this.cropId++;
    const newCrop: Crop = { ...crop, id, createdAt: new Date() };
    this.crops.set(id, newCrop);
    return newCrop;
  }
  
  async updateCrop(id: number, crop: Partial<Crop>): Promise<Crop | undefined> {
    const existingCrop = this.crops.get(id);
    if (!existingCrop) return undefined;
    
    const updatedCrop = { ...existingCrop, ...crop };
    this.crops.set(id, updatedCrop);
    return updatedCrop;
  }
  
  async deleteCrop(id: number): Promise<boolean> {
    return this.crops.delete(id);
  }
  
  // Soil data operations
  async getSoilData(id: number): Promise<SoilData | undefined> {
    return this.soilData.get(id);
  }
  
  async getSoilDataByCrop(cropId: number): Promise<SoilData | undefined> {
    return Array.from(this.soilData.values()).find(
      (data) => data.cropId === cropId
    );
  }
  
  async getCurrentSoilData(userId: number): Promise<SoilData | undefined> {
    const currentCrop = await this.getCurrentCrop(userId);
    if (!currentCrop) return undefined;
    
    return this.getSoilDataByCrop(currentCrop.id);
  }
  
  async createSoilData(soilData: InsertSoilData): Promise<SoilData> {
    const id = this.soilDataId++;
    const newSoilData: SoilData = { 
      ...soilData, 
      id, 
      measurementDate: new Date() 
    };
    this.soilData.set(id, newSoilData);
    return newSoilData;
  }
  
  // Weather data operations
  async getWeatherData(id: number): Promise<WeatherData | undefined> {
    return this.weatherData.get(id);
  }
  
  async getWeatherDataByUser(userId: number): Promise<WeatherData | undefined> {
    const user = await this.getUser(userId);
    if (!user || !user.location) return undefined;
    
    return this.getWeatherDataByLocation(user.location);
  }
  
  async getWeatherDataByLocation(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values()).find(
      (data) => data.location.toLowerCase() === location.toLowerCase()
    );
  }
  
  async createWeatherData(weatherData: InsertWeatherData): Promise<WeatherData> {
    const id = this.weatherDataId++;
    const newWeatherData: WeatherData = { 
      ...weatherData, 
      id, 
      timestamp: new Date() 
    };
    this.weatherData.set(id, newWeatherData);
    return newWeatherData;
  }
  
  // Market data operations
  async getMarketData(id: number): Promise<MarketData | undefined> {
    return this.marketData.get(id);
  }
  
  async getMarketDataByCrop(cropName: string): Promise<MarketData | undefined> {
    return Array.from(this.marketData.values()).find(
      (data) => data.cropName.toLowerCase() === cropName.toLowerCase()
    );
  }
  
  async getAllMarketData(): Promise<MarketData[]> {
    return Array.from(this.marketData.values());
  }
  
  async createMarketData(marketData: InsertMarketData): Promise<MarketData> {
    const id = this.marketDataId++;
    const newMarketData: MarketData = { 
      ...marketData, 
      id, 
      lastUpdated: new Date() 
    };
    this.marketData.set(id, newMarketData);
    return newMarketData;
  }
  
  async updateMarketData(id: number, marketData: Partial<MarketData>): Promise<MarketData | undefined> {
    const existingData = this.marketData.get(id);
    if (!existingData) return undefined;
    
    const updatedData = { 
      ...existingData, 
      ...marketData, 
      lastUpdated: new Date() 
    };
    this.marketData.set(id, updatedData);
    return updatedData;
  }
  
  // Disease record operations
  async getDiseaseRecord(id: number): Promise<DiseaseRecord | undefined> {
    return this.diseaseRecords.get(id);
  }
  
  async getDiseaseRecordsByCrop(cropId: number): Promise<DiseaseRecord[]> {
    return Array.from(this.diseaseRecords.values()).filter(
      (record) => record.cropId === cropId
    );
  }
  
  async createDiseaseRecord(diseaseRecord: InsertDiseaseRecord): Promise<DiseaseRecord> {
    const id = this.diseaseRecordId++;
    const newRecord: DiseaseRecord = { 
      ...diseaseRecord, 
      id, 
      scanDate: new Date() 
    };
    this.diseaseRecords.set(id, newRecord);
    return newRecord;
  }
  
  // Government scheme operations
  async getGovernmentScheme(id: number): Promise<GovernmentScheme | undefined> {
    return this.governmentSchemes.get(id);
  }
  
  async getAllGovernmentSchemes(): Promise<GovernmentScheme[]> {
    return Array.from(this.governmentSchemes.values());
  }
  
  async createGovernmentScheme(scheme: InsertGovernmentScheme): Promise<GovernmentScheme> {
    const id = this.governmentSchemeId++;
    const newScheme: GovernmentScheme = { ...scheme, id };
    this.governmentSchemes.set(id, newScheme);
    return newScheme;
  }
  
  // Settings operations
  async getSettings(userId: number): Promise<Settings | undefined> {
    return Array.from(this.settings.values()).find(
      (setting) => setting.userId === userId
    );
  }
  
  async createSettings(settings: InsertSettings): Promise<Settings> {
    const id = this.settingsId++;
    const newSettings: Settings = { ...settings, id };
    this.settings.set(id, newSettings);
    return newSettings;
  }
  
  async updateSettings(userId: number, settings: Partial<Settings>): Promise<Settings | undefined> {
    const existingSettings = Array.from(this.settings.values()).find(
      (setting) => setting.userId === userId
    );
    
    if (!existingSettings) return undefined;
    
    const updatedSettings = { ...existingSettings, ...settings };
    this.settings.set(existingSettings.id, updatedSettings);
    return updatedSettings;
  }
  
  // Initialize sample data
  private initSampleData() {
    // Sample user
    const user: User = {
      id: this.userId++,
      username: "farmerraj",
      password: "password123", // This would be hashed in a real app
      name: "Farmer Raj",
      email: "raj@agrimail.com",
      phone: "9876543210",
      location: "Rajpur, Madhya Pradesh",
      farmSize: "5.5 acres",
      farmType: "Mixed (Rice, Wheat)",
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    
    // Sample crop
    const crop: Crop = {
      id: this.cropId++,
      userId: user.id,
      name: "Rice",
      emoji: "🌾",
      status: "healthy",
      plantedDate: new Date("2023-08-01"),
      expectedHarvest: new Date("2023-10-15"),
      growthProgress: 65,
      waterNeeds: "High",
      nutritionNeeds: "Nitrogen, Potassium",
      fieldName: "North Field",
      fieldSize: 2.5,
      createdAt: new Date()
    };
    this.crops.set(crop.id, crop);
    
    // Sample soil data
    const soil: SoilData = {
      id: this.soilDataId++,
      userId: user.id,
      cropId: crop.id,
      status: "Optimal",
      percentage: 68,
      pH: 6.8,
      nitrogen: 75,
      phosphorus: 62,
      potassium: 80,
      type: "Clay Loam",
      measurementDate: new Date()
    };
    this.soilData.set(soil.id, soil);
    
    // Sample weather data
    const weather: WeatherData = {
      id: this.weatherDataId++,
      userId: user.id,
      location: "Rajpur, Madhya Pradesh",
      condition: "Sunny",
      temperature: 28,
      humidity: 65,
      wind: 8,
      precipitation: 0,
      feelsLike: 29,
      uvIndex: 7,
      timestamp: new Date()
    };
    this.weatherData.set(weather.id, weather);
    
    // Sample market data
    const market: MarketData = {
      id: this.marketDataId++,
      cropName: "Rice",
      price: 2050,
      trend: 2.5,
      lastUpdated: new Date(),
      aiTip: "Consider holding your harvest for 15 more days. Prices are projected to rise by 8% during festival season.",
      nearbyMandis: [
        { name: "Rajpur Mandi", price: 2050, distance: 5 },
        { name: "Bhopal Central", price: 2020, distance: 12 },
        { name: "Indore Agri Hub", price: 2120, distance: 25 }
      ],
      forecastTrend: {
        days: ["Today", "1 Week", "2 Weeks", "1 Month"],
        prices: [2050, 2100, 2210, 2150]
      }
    };
    this.marketData.set(market.id, market);
    
    // Sample government schemes
    const schemes = [
      {
        id: this.governmentSchemeId++,
        title: "PM-KISAN",
        organization: "Ministry of Agriculture",
        description: "Financial assistance to small and marginal farmers through direct benefit transfer.",
        eligibility: ["Small and marginal farmers with up to 2 hectares", "Valid land records", "Bank account linked to Aadhaar"],
        benefits: ["₹6,000 per year in three equal installments", "Direct bank transfer", "No middlemen"],
        deadline: "30 Sep 2023",
        applicationUrl: "https://pmkisan.gov.in",
        category: "Financial Assistance",
        isNew: true
      },
      {
        id: this.governmentSchemeId++,
        title: "Soil Health Card Scheme",
        organization: "Department of Agriculture",
        description: "Free soil testing and recommendations for appropriate nutrients to improve soil health and fertility.",
        eligibility: ["All farmers", "Valid ID proof", "Land ownership documents"],
        benefits: ["Free soil testing", "Customized fertilizer recommendations", "Increased crop yield"],
        deadline: "Ongoing",
        applicationUrl: "https://soilhealth.gov.in",
        category: "Technical Assistance",
        isNew: false
      },
      {
        id: this.governmentSchemeId++,
        title: "Solar Pump Subsidy",
        organization: "Ministry of New and Renewable Energy",
        description: "Subsidy for installing solar-powered irrigation pumps to reduce dependency on diesel and electricity.",
        eligibility: ["Small and marginal farmers", "No existing solar pump", "Valid bank account"],
        benefits: ["Up to 90% subsidy on solar pump installation", "Reduced electricity costs", "Environment-friendly irrigation"],
        deadline: "15 Oct 2023",
        applicationUrl: "https://mnre.gov.in/solar-pump",
        category: "Irrigation",
        isNew: true
      }
    ];
    
    schemes.forEach(scheme => {
      this.governmentSchemes.set(scheme.id, scheme as GovernmentScheme);
    });
    
    // Sample settings
    const settings: Settings = {
      id: this.settingsId++,
      userId: user.id,
      notificationsEnabled: true,
      voiceAssistantEnabled: true,
      autoScanEnabled: false,
      darkModeEnabled: false,
      language: "en"
    };
    this.settings.set(settings.id, settings);
  }
}

export const storage = new MemStorage();
