CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `resort_name` varchar(45) NOT NULL,
  `destination` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image` varchar(45) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `resort_name_UNIQUE` (`resort_name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Ao Nang Resort','Thailand','Looking to enjoy an event or a game while in town? See what\'s happening at Ao Nang Krabi Boxing Stadium or Chaloem Rattanakosin Sports Stadium.','2022-01-12','2022-02-20','Ao-Nang-Thailand.jpg',380),(2,'Bali Resort','Indonesia','Bali Dynasty Resort is located near a private beach and in an area with good shopping.','2022-01-02','2022-01-05','Bali-Resort-Indonesia.jpg',312),(3,'Cauayan Island Resort','Philippines','Located in El Nido, Cauayan Island Resort is on the beach. The natural beauty of Corong Corong Beach and Duli Beach can be enjoyed by anyone.','2022-01-22','2022-02-22','Cauayan-Island-Resort-Philippines.jpg',97),(4,'Ceylon Tea Trails','Sri Lanka','All 5 rooms boast deep soaking tubs and offer free WiFi and iPod docks. Guests will also find premium bedding, free newspapers, and free bottled water.','2022-03-10','2022-03-15','Ceylon-Tea-Trails-Sri-Lanka.jpg',379),(5,'Cresta Lodge','Msasa Harare','Located in Harare, Cresta Lodge - Harare is in the suburbs. Kamfinsa Shopping Centre and Eastgate Centre are worth checking out if shopping is on the agenda','2022-03-12','2022-03-18','Cresta_Lodge_Msasa_Harare.jpg',1242),(6,'Gili Air Resort','Indonesia','This resort is by the sea and is on a private beach.The beach can be enjoyed by anyone.','2022-04-22','2022-05-02','Gili-Air-Resort-Indonesia.jpg',575),(7,'Koh Phangan Resort','Thailand','Looking to get your feet wet? Scuba diving and fishing adventures can be found near the property.','2022-04-09','2022-04-15','Koh-Phangan-Thailand.jpg',657),(8,'La Granja Resort','Ibiza','Located in Sant Antoni de Portmany. Port of Ibiza and Marina Botafoch are worth checking out if an activity is on the agenda.','2021-12-22','2021-01-01','La-Granja-Ibiza.jpg',1352),(9,'Hua Hin Resort','Thailand','The area\'s natural beauty can be seen at Bang Niang Beach and Nang Thong Beach.','2022-12-26','2022-12-30','Hua-Hin-Thailand.jpg',325),(10,'Maldives Stay','Maldives','Located in Nha Trang, MerPerle Hon Tam Resort is on a private beach. Take an opportunity to explore the area for water adventures such as swimming','2021-09-14','2022-10-03','Maldives-Stay-Maldives.jpg',1491),(11,'Merperle hon tam resort','Vietnam','Located on the beach and in an area with good airport proximity. Local points of interest include Republic Square.','2022-05-08','2022-05-16','Merperle-hon-tam-resort-vietnam.jpg',286),(12,'Panama Resort','Panama','Located in Panama, this resort is by the sea. See what\'s happening at Stanovi Stadium or Kresimir Cosic Hall.','2021-04-18','2021-05-02','Panama-Resort-Panama.jpg',255),(13,'Punta Cana bavaro','Dominican Republic','Located in Punta Cana, Dreams Royal Beach Punta Cana - All Inclusive is connected to a shopping center.','2022-06-20','2022-06-26','Punta-Cana-bavaro-dominican-republic.jpg',307),(14,'Punta Cana Resort','Dominican Republic','Luxury is near theme parks and on the beach. Downtown Punta Cana and Palma Real Shopping Village are worth checking out if shopping is on the agenda','2022-07-19','2022-07-27','Punta-Cana-dominican-republic.jpg',355),(15,'RIU Tikida Palace','Morocco','Located in Agadir, Riu Palace Tikida Agadir - All Inclusive is near the beach. Agadir Marina and Golf Club Med les Dunes are worth checking out if an activity is on the agenda.','2022-02-06','2022-02-15','RIU-Tikida-Palace-Morocco.jpg',320),(16,'Santorini Resort','Greece','This resort is located in Santorini. The natural beauty of Perivolos Beach and Perissa Beach can be enjoyed by anyone.','2022-09-14','2022-09-23','Santorini-Resort-Greece.jpg',388),(17,'Siargao Island Resort','Philippines','Located in General Luna, Siargao Bleu Resort And Spa is on a private beach.','2022-08-01','2022-08-06','Siargao-Island-Resort-Philippines.jpg',185),(18,'The Anam Cam-Ranh resort','Vietnam','The area\'s natural beauty can be seen at Bai Dai Beach and Nha Trang Beach. Traveling with kids? Consider Sailing Club Nha Trang and Vinpearl Cable Car.','2022-07-02','2022-07-10','The-Anam-resort-in-Cam-Ranh-Vietnam.jpg',150),(19,'The Anam Resort','Vietnam','Located in Cam Lam, Fusion Resort Cam Ranh is in the suburbs and on a private beach. The area\'s natural beauty can be seen at Nha Trang Beach and Bai Dai Beach.','2022-08-05','2022-08-12','The-Anam-Resort-Viat-Nam.jpg',222),(20,'The Anam Retreat','Vietnam','Located in Nha Trang, MerPerle Hon Tam Resort is on a private beach. Take an opportunity to explore the area for water adventures such as swimming.','2022-10-08','2022-10-18','The-anam-stay-viet-nam.jpg',89),(21,'The Waters Khao Lak','Thailand','Located in Takua Pa, Le Meridien Khao Lak Resort & Spa is in a rural area and on the beach. The area\'s natural beauty can be seen at Bang Niang Beach and Nang Thong Beach.','2022-06-12','2022-06-18','The-waters-khao-lak-thailand.jpg',254),(22,'Zadar Resort','Croatia','Located in Zadar, this resort is by the sea. Looking to enjoy an event or a game while in town? See what\'s happening at Stanovi Stadium or Kresimir Cosic Hall.','2022-02-18','2022-02-22','Zadar-Resort-Croatia.jpg',369),(42,'pppppppppp','gggg','grge','2021-06-30','2021-07-09','sssssss',650);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-02 11:40:04
