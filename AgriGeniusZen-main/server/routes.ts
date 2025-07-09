import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertUserSchema,
  insertCropSchema,
  insertSoilDataSchema,
  insertWeatherDataSchema,
  insertMarketDataSchema,
  insertDiseaseRecordSchema,
  insertSettingsSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // ========== User routes ==========
  app.get('/api/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  app.post('/api/user/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid user data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create user' });
    }
  });
  
  app.post('/api/user/profile', async (req, res) => {
    try {
      // For demo purposes, always use user ID 1
      const userId = 1;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const updatedUser = await storage.updateUser(userId, req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  });

  // ========== Weather routes ==========
  app.get('/api/weather', async (req, res) => {
    try {
      // For demo purposes, always use user ID 1
      const userId = 1;
      const weatherData = await storage.getWeatherDataByUser(userId);
      
      if (!weatherData) {
        return res.status(404).json({ message: 'Weather data not found' });
      }
      
      // Simplify response for the frontend
      res.json({
        condition: weatherData.condition,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        wind: weatherData.wind,
        precipitation: weatherData.precipitation,
        feelsLike: weatherData.feelsLike,
        uvIndex: weatherData.uvIndex
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch weather data' });
    }
  });

  // ========== Soil data routes ==========
  app.get('/api/soil-data', async (req, res) => {
    try {
      // For demo purposes, always use user ID 1
      const userId = 1;
      const soilData = await storage.getCurrentSoilData(userId);
      
      if (!soilData) {
        return res.status(404).json({ message: 'Soil data not found' });
      }
      
      // Simplify response for the frontend
      res.json({
        status: soilData.status,
        percentage: soilData.percentage,
        pH: soilData.pH,
        nitrogen: soilData.nitrogen,
        phosphorus: soilData.phosphorus,
        potassium: soilData.potassium,
        type: soilData.type
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch soil data' });
    }
  });

  // ========== Crop routes ==========
  app.get('/api/crops/current', async (req, res) => {
    try {
      // For demo purposes, always use user ID 1
      const userId = 1;
      const crop = await storage.getCurrentCrop(userId);
      
      if (!crop) {
        return res.status(404).json({ message: 'No current crop found' });
      }
      
      // Simplify response for the frontend
      res.json({
        id: crop.id,
        name: crop.name,
        emoji: crop.emoji,
        status: crop.status === 'healthy' ? 'Healthy' : 
                crop.status === 'stressed' ? 'Stressed' : 'Diseased',
        plantedDate: crop.plantedDate?.toISOString(),
        expectedHarvest: crop.expectedHarvest?.toISOString(),
        growthProgress: crop.growthProgress,
        waterNeeds: crop.waterNeeds,
        nutritionNeeds: crop.nutritionNeeds
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch crop data' });
    }
  });
  
  app.get('/api/crops/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid crop ID' });
      }
      
      const crop = await storage.getCrop(id);
      if (!crop) {
        return res.status(404).json({ message: 'Crop not found' });
      }
      
      res.json(crop);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch crop data' });
    }
  });
  
  app.post('/api/crops', async (req, res) => {
    try {
      const cropData = insertCropSchema.parse(req.body);
      const newCrop = await storage.createCrop(cropData);
      res.status(201).json(newCrop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid crop data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create crop' });
    }
  });

  // ========== Market data routes ==========
  app.get('/api/market/current', async (req, res) => {
    try {
      // For demo purposes, always use user ID 1
      const userId = 1;
      const crop = await storage.getCurrentCrop(userId);
      
      if (!crop) {
        return res.status(404).json({ message: 'No current crop found' });
      }
      
      const marketData = await storage.getMarketDataByCrop(crop.name);
      
      if (!marketData) {
        return res.status(404).json({ message: 'Market data not found' });
      }
      
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch market data' });
    }
  });
  
  app.get('/api/market/:cropName', async (req, res) => {
    try {
      const cropName = req.params.cropName;
      const marketData = await storage.getMarketDataByCrop(cropName);
      
      if (!marketData) {
        return res.status(404).json({ message: 'Market data not found' });
      }
      
      res.json(marketData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch market data' });
    }
  });

  // ========== Disease detection routes ==========
  app.post('/api/scan', async (req, res) => {
    try {
      // In a real app, this would process the image with an AI model
      // For the demo, return a mock response indicating healthy status
      res.json({
        crop: "Rice",
        health: "Healthy",
        issues: [],
        recommendations: ["Continue current irrigation schedule", "Apply nitrogen in 5 days"]
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to process scan' });
    }
  });
  
  app.post('/api/disease-detection', async (req, res) => {
    try {
      // In a real app, this would process the image with an AI model
      // For the demo, return a mock response for disease detection
      
      // Simulate a random result - sometimes healthy, sometimes diseased
      const isHealthy = Math.random() > 0.5;
      
      if (isHealthy) {
        return res.json({
          name: "",
          confidence: 95,
          description: "",
          treatment: [],
          preventiveMeasures: [],
          organicRemedies: [],
          isSevere: false
        });
      } else {
        res.json({
          name: "Bacterial Leaf Blight",
          confidence: 89,
          description: "A bacterial disease causing yellow to white lesions along the leaf veins.",
          treatment: [
            "Drain the field and allow to dry when possible",
            "Apply copper-based bactericides as per recommended dose",
            "Remove and destroy infected plant debris"
          ],
          preventiveMeasures: [
            "Use disease-free seeds and seedlings",
            "Maintain proper spacing between plants for better air circulation",
            "Avoid excessive nitrogen fertilization"
          ],
          organicRemedies: [
            "Spray neem oil solution (5ml/liter of water) at weekly intervals",
            "Apply compost tea as a natural fungicide",
            "Introduce beneficial microorganisms to soil"
          ],
          isSevere: false
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to process disease detection' });
    }
  });

  // ========== Government schemes routes ==========
  app.get('/api/government-schemes', async (req, res) => {
    try {
      const schemes = await storage.getAllGovernmentSchemes();
      res.json(schemes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch government schemes' });
    }
  });

  // ========== Crop suitability routes ==========
  app.get('/api/crop-suitability', async (req, res) => {
    try {
      // In a real app, this would use AI to analyze soil data and suggest crops
      // For the demo, return mock crop suitability data
      res.json([
        {
          name: "Rice",
          icon: "🌾",
          score: 92,
          soil: "Clay loam",
          water: "High",
          season: "Kharif (June-Oct)"
        },
        {
          name: "Wheat",
          icon: "🌿",
          score: 78,
          soil: "Clay loam",
          water: "Medium",
          season: "Rabi (Nov-Apr)"
        },
        {
          name: "Corn",
          icon: "🌽",
          score: 85,
          soil: "Loam",
          water: "Medium",
          season: "Kharif (June-Oct)"
        },
        {
          name: "Soybeans",
          icon: "🫘",
          score: 70,
          soil: "Loam",
          water: "Medium-Low",
          season: "Kharif (June-Oct)"
        }
      ]);
    } catch (error) {
      res.status(500).json({ message: 'Failed to process crop suitability analysis' });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
