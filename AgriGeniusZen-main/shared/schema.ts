import { pgTable, text, serial, integer, boolean, timestamp, json, real, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  farmSize: text("farm_size"),
  farmType: text("farm_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Crops table
export const cropStatusEnum = pgEnum("crop_status", ["healthy", "stressed", "diseased"]);

export const crops = pgTable("crops", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  emoji: text("emoji"),
  status: cropStatusEnum("status").default("healthy"),
  plantedDate: timestamp("planted_date"),
  expectedHarvest: timestamp("expected_harvest"),
  growthProgress: integer("growth_progress").default(0),
  waterNeeds: text("water_needs"),
  nutritionNeeds: text("nutrition_needs"),
  fieldName: text("field_name"),
  fieldSize: real("field_size"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Soil data table
export const soilData = pgTable("soil_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cropId: integer("crop_id").references(() => crops.id),
  status: text("status").notNull(),
  percentage: integer("percentage").notNull(),
  pH: real("ph"),
  nitrogen: integer("nitrogen"),
  phosphorus: integer("phosphorus"),
  potassium: integer("potassium"),
  type: text("type"),
  measurementDate: timestamp("measurement_date").defaultNow(),
});

// Weather data table
export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  location: text("location").notNull(),
  condition: text("condition").notNull(),
  temperature: real("temperature").notNull(),
  humidity: integer("humidity"),
  wind: real("wind"),
  precipitation: real("precipitation"),
  feelsLike: real("feels_like"),
  uvIndex: integer("uv_index"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Market data table
export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  price: real("price").notNull(),
  trend: real("trend"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  aiTip: text("ai_tip"),
  nearbyMandis: json("nearby_mandis"),
  forecastTrend: json("forecast_trend"),
});

// Disease detection records
export const diseaseStatusEnum = pgEnum("disease_severity", ["none", "mild", "moderate", "severe"]);

export const diseaseRecords = pgTable("disease_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cropId: integer("crop_id").references(() => crops.id),
  name: text("name"),
  confidence: integer("confidence"),
  description: text("description"),
  treatment: json("treatment").default([]),
  preventiveMeasures: json("preventive_measures").default([]),
  organicRemedies: json("organic_remedies").default([]),
  severity: diseaseStatusEnum("severity").default("none"),
  scanDate: timestamp("scan_date").defaultNow(),
  imageUrl: text("image_url"),
});

// Government schemes
export const governmentSchemes = pgTable("government_schemes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  description: text("description").notNull(),
  eligibility: json("eligibility").default([]),
  benefits: json("benefits").default([]),
  deadline: text("deadline"),
  applicationUrl: text("application_url"),
  category: text("category"),
  isNew: boolean("is_new").default(false),
});

// Settings table
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).unique(),
  notificationsEnabled: boolean("notifications_enabled").default(true),
  voiceAssistantEnabled: boolean("voice_assistant_enabled").default(true),
  autoScanEnabled: boolean("auto_scan_enabled").default(false),
  darkModeEnabled: boolean("dark_mode_enabled").default(false),
  language: text("language").default("en"),
});

// Define insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true,
  location: true,
  farmSize: true,
  farmType: true,
});

export const insertCropSchema = createInsertSchema(crops).omit({
  id: true,
  createdAt: true,
});

export const insertSoilDataSchema = createInsertSchema(soilData).omit({
  id: true,
  measurementDate: true,
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({
  id: true,
  timestamp: true,
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({
  id: true,
  lastUpdated: true,
});

export const insertDiseaseRecordSchema = createInsertSchema(diseaseRecords).omit({
  id: true,
  scanDate: true,
});

export const insertGovernmentSchemeSchema = createInsertSchema(governmentSchemes).omit({
  id: true,
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
});

// Define types for use in application
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Crop = typeof crops.$inferSelect;
export type InsertCrop = z.infer<typeof insertCropSchema>;

export type SoilData = typeof soilData.$inferSelect;
export type InsertSoilData = z.infer<typeof insertSoilDataSchema>;

export type WeatherData = typeof weatherData.$inferSelect;
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;

export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;

export type DiseaseRecord = typeof diseaseRecords.$inferSelect;
export type InsertDiseaseRecord = z.infer<typeof insertDiseaseRecordSchema>;

export type GovernmentScheme = typeof governmentSchemes.$inferSelect;
export type InsertGovernmentScheme = z.infer<typeof insertGovernmentSchemeSchema>;

export type Settings = typeof settings.$inferSelect;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
