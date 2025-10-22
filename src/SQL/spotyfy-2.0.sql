CREATE DATABASE  IF NOT EXISTS `spotify_2.0` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spotify_2.0`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: spotify_2.0
-- ------------------------------------------------------
-- Server version	8.4.6

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
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `album_id` int NOT NULL AUTO_INCREMENT,
  `nombre_album` varchar(255) NOT NULL,
  `artista_id` int DEFAULT NULL,
  `discografica_id` int DEFAULT NULL,
  `imagen_portada` varchar(255) DEFAULT NULL,
  `anio_lanzamiento` year DEFAULT NULL,
  PRIMARY KEY (`album_id`),
  UNIQUE KEY `nombre_album_UNIQUE` (`nombre_album`),
  KEY `artista_id` (`artista_id`),
  KEY `discografica_id` (`discografica_id`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`artista_id`) REFERENCES `artista` (`artista_id`),
  CONSTRAINT `album_ibfk_2` FOREIGN KEY (`discografica_id`) REFERENCES `discografica` (`discografica_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (17,'Is There Anybody Out There',1,230,'imagenalbum.jpg',NULL),(18,'Radio Sampler 2xCD',1,230,NULL,NULL),(19,'Delicate Sound Of Thunder',1,230,'imagenalbum.jpg',NULL),(20,'Abbey Road',4,231,NULL,NULL),(21,'Use Your Illusion II',5,232,NULL,NULL),(22,'Appetite for Destruction',5,232,'imagenalbum.jpg',NULL),(23,'True Blue',7,233,NULL,NULL),(24,'Like A Virgin',7,233,'imagenalbum.jpg',NULL),(25,'Fito Paez',8,230,NULL,NULL),(26,'Antología',8,229,'imagenalbum.jpg',NULL),(27,'Diego Torres',9,230,NULL,NULL),(28,'Loba',10,227,'imagenalbum.jpg',NULL),(29,'Pies Descalzos',10,229,NULL,NULL),(30,'Papi Juancho',11,227,'imagenalbum.jpg',NULL),(31,'Vives',12,227,NULL,NULL),(32,'OCEAN',13,229,'imagenalbum.jpg',NULL),(33,'Cello Concertos',14,253,NULL,NULL),(34,'Plays Weir, Finnissy, Newman And Skempton',15,268,'imagenalbum.jpg',NULL),(35,'My father Knew Charles Ives and Harmonielehre',16,266,NULL,NULL),(36,'Pied Piper Fantasy',17,272,'imagenalbum.jpg',NULL),(39,'El Amor Después Del Amor',2,231,NULL,1992);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artista`
--

DROP TABLE IF EXISTS `artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artista` (
  `artista_id` int NOT NULL AUTO_INCREMENT,
  `nombre_artista` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`artista_id`),
  UNIQUE KEY `nombre_artista_UNIQUE` (`nombre_artista`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artista`
--

LOCK TABLES `artista` WRITE;
/*!40000 ALTER TABLE `artista` DISABLE KEYS */;
INSERT INTO `artista` VALUES (1,'Pink Floyd','Pink Floyd.jpg'),(2,'AC/DC',NULL),(3,'The Rolling Stones','The Rolling Stones.jpg'),(4,'The Beatles',NULL),(5,'Guns\'n Roses',NULL),(6,'Linkin Park',NULL),(7,'Madonna','Madonna.jpg'),(8,'Fito Paez',NULL),(9,'Diego Torres','Diego Torres.jpg'),(10,'Shakira',NULL),(11,'Maluma','Maluma.jpg'),(12,'Carlos Vives',NULL),(13,'Karol G','Karol G.jpg'),(14,'Yo-Yo Ma',NULL),(15,'Michael Finnissy','Michael Finnissy.jpg'),(16,'John Adams',NULL),(17,'John Corigliano','John Corigliano.jpg'),(18,'Terry Riley',NULL),(19,'Brian John Peter Ferneyhough','Brian John Peter Ferneyhough.jpg'),(20,'Charlie Parker',NULL),(21,'MIles Davis','MIles Davis.jpg'),(22,'Dizzy Gillespie',NULL),(23,'Coleman Hawkins','Coleman Hawkins.jpg'),(24,'Billie Holiday',NULL),(25,'Ray Charles','Ray Charles.jpg'),(26,'Chet Baker',NULL),(27,'Celia Cruz','Celia Cruz.jpg'),(28,'Ruben Blades',NULL),(29,'Willie Colon','Willie Colon.jpg'),(30,'Hector Lavoe',NULL),(31,'Tito Rodriguez','Tito Rodriguez.jpg'),(32,'Luis Enrique',NULL),(33,'Astor Piazzolla','Astor Piazzolla.jpg'),(34,'Carlos Gardel',NULL),(35,'Adriana Varela','Adriana Varela.jpg'),(36,'Alberto Podestá',NULL),(37,'Bajofondo Tango Club','Bajofondo Tango Club.jpg'),(38,'Susana Rinaldi',NULL),(39,'Dr. Dre','Dr. Dre.jpg'),(40,'Eminem',NULL),(41,'Snoop Dogg','Snoop Dogg.jpg'),(42,'Jay-Z',NULL),(43,'Beastie Boys','Beastie Boys.jpg'),(44,'Kanye West',NULL),(45,'Carl Cox','Carl Cox.jpg'),(46,'Marco Carola',NULL),(47,'Oscar Mulero','Oscar Mulero.jpg'),(48,'Nina Kraviz',NULL),(49,'Adam Beyer','Adam Beyer.jpg'),(50,'Solomun',NULL),(52,'Amy Lee',NULL);
/*!40000 ALTER TABLE `artista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion`
--

DROP TABLE IF EXISTS `cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion` (
  `cancion_id` int NOT NULL AUTO_INCREMENT,
  `nombre_cancion` varchar(255) NOT NULL,
  `duracion_min` int DEFAULT NULL,
  `reproducciones` bigint DEFAULT '0',
  `likes` int DEFAULT '0',
  `album_id` int DEFAULT NULL,
  PRIMARY KEY (`cancion_id`),
  UNIQUE KEY `idx_unique_cancion_artista` (`nombre_cancion`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `cancion_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion`
--

LOCK TABLES `cancion` WRITE;
/*!40000 ALTER TABLE `cancion` DISABLE KEYS */;
INSERT INTO `cancion` VALUES (1,'In The Flesh',3,1000050,7500,17),(2,'The Thin Ice',2,850050,7600,17),(3,'Gone For Bad',4,1200400,6500,18),(4,'Fink Is The King',3,218500,8600,18),(5,'Shine On You Crazy Diamond',12,210000,4500,19),(6,'Yet Another Movie',4,4500668,1500,19),(7,'Oh! Darling',3,1598634,256986,20),(8,'Come Together',4,3568946,103569,20),(9,'Something',3,628634,5698,20),(10,'The End',2,68946,3569,20),(11,'Open Your Heart',4,2500245,1785444,23),(12,'Material Girl',4,457788,68555,23),(14,'Cancion Sobre Cancion',3,988100,578101,25),(15,'11 Y 6',3,1122554,245778,25),(16,'Y Dale Alegría A Mi Corazón',5,1985663,658874,26),(17,'El Amor Después Del Amor',5,2100358,35456,26),(18,'Estamos Juntos',4,389555,12488,27),(19,'No Tengas Miedo',4,258456,5247,27),(20,'Lo Hecho Esta Hecho',3,986444,657112,28),(21,'Loba',3,3150441,1244523,28),(22,'Años Luz',3,1335054,485777,28),(23,'Estoy Aqui',4,845300,247712,29),(24,'Hawai',3,1325450,857400,30),(25,'La Cura',3,750425,74856,30),(26,'Salida de escape',3,166582,37142,30),(27,'Ansiedad',3,500266,25004,30),(28,'Baby',4,70052,12488,32),(29,'Dices que te vas',3,1122554,35456,32),(30,'Hoy tengo tiempo',3,10458,24115,31),(31,'La tierra prometida',3,10047,3578,31),(32,'Mañana',2,8507,1574,31),(33,'In A Minor For Cello And Orchestra, Op',19,15934,0,33),(34,'Prelude: Lento Allegro Maestoso',12,96306,4157,33),(35,'Intermezzo',6,95338,41,33),(36,'Reels',8,53402,340,34),(37,'An Mein Klavier',8,523452,984,34),(38,'Le Repos Sur Le Lit',7,589744,891,34),(39,'My father Knew Charles Ives and Harmonielehre',9,292364,9236,35),(40,'Harmonielehre I',17,0,0,35),(41,'Harmonielehre II .The Anfortas Wound',12,2585604,984,35),(42,'Sunrise And The Piper s Song',9,666667,6,36),(43,'The Rats',1,5510,54,36),(44,'The Children is March',9,4295153,157,36),(45,'G. Song',3,535211,5352,NULL),(46,'MIce',2,564916,9,NULL),(47,'In The Summer',6,4701,984,NULL),(48,'Time And Motion Study I',8,673426,642,NULL),(49,'Bone Alphabet',3,578738,54,NULL),(50,'Time And Motion Study II',22,714249,98,NULL),(51,'My Old Flame',3,811641,1164,NULL),(52,'Air Conditioning',3,592559,5,NULL),(53,'Crazeology',3,89423798,158,NULL),(54,'If I Were A Bell',8,949856,4985,NULL),(55,'You are My Everything',5,606381,54,NULL),(56,'It Could Happen To You',6,133346,0,NULL),(57,'A Hand Fulla Gimme',3,108807,880,NULL),(58,'Groovin High',2,161,95,NULL),(59,'Blue N Boogie',3,842894,39,NULL),(60,'I Surrender Dear',4,122628,4157,NULL),(61,'Smack',2,123,41,NULL),(62,'My Ideal',3,4552442,247,NULL),(63,'Lover Man Oh Where Can You Be?',3,136450,984,NULL),(64,'That Ole Devil Called Love',3,1325,891,NULL),(65,'No More',2,6261991,593,NULL),(66,'What Would I Do Without You',2,150271,545,NULL),(67,'It is All Right',2,666667,984,NULL),(68,'I Want To Know',2,971539,340,NULL),(69,'Fair Weather',7,164093,54,NULL),(70,'Polka Dots And Moonbeams',8,675467,157,NULL),(71,'Hotel 49',10,9681087,9236,NULL),(72,'Bemba Colora',9,177914,9,NULL),(73,'Son Con Guaguanco',3,931067,984,NULL),(74,'Es La Humanidad',2,7139063,6,NULL),(75,'El Velorio',5,100184,5352,NULL),(76,'Jazzy',4,205557,5,NULL),(77,'Willie Baby',2,7169667,158,NULL),(78,'Borinquen',3,4809732,642,NULL),(79,'El Todopoderoso',4,219379,54,NULL),(80,'Emborrachame De Amor',3,730767,0,NULL),(81,'Paraiso De Dulzura',4,266281,1164,NULL),(82,'Satin And Lace',4,233200,95,NULL),(83,'Mama Guela',2,15518541,39,NULL),(84,'Te Comiste Un Pan',2,210,4985,NULL),(85,'Desesperado',4,247022,41,NULL),(86,'Tu No Le Amas Le Temes',4,1582509,247,NULL),(87,'Comprendelo',5,145,880,NULL),(88,'Adiós Nonino',8,260843,891,NULL),(89,'Otoño Porteño',5,161387638,593,NULL),(90,'Michelangelo 70',3,27647926,4157,NULL),(91,'Chorra',2,274665,984,NULL),(92,'Dicen Que Dicen',2,1644186,340,NULL),(93,'Ebrio',2,54575,984,NULL),(94,'Aquello',4,288486,157,NULL),(95,'Don Carlos',4,167593735,9236,NULL),(96,'Milongón Del Guruyú',4,245,0,NULL),(97,'Alma De Bohemio',3,302308,984,NULL),(98,'Al Compas Del Corazon',2,3523283,6,NULL),(99,'Temblando',2,7657,54,NULL),(100,'solari yacumenza',7,316129,98,NULL),(101,'flor de piel',4,1738831,5352,NULL),(102,'Clueca la Cueca',6,1215,9,NULL),(103,'Soy Un Circo',5,329951,158,NULL),(104,'La Chanson Des Vieux Amants',5,1738,642,NULL),(105,'Gabbiani',4,2315,54,NULL),(106,'Let Me Ride',11,343772,0,NULL),(107,'One Eight Seven',4,1801928,1164,NULL),(108,'The Ringer',5,357594,39,NULL),(109,'Greatest',3,11261476,4985,NULL),(110,'Lucky You',4,297944,54,NULL),(111,'E Side',5,714156,247,NULL),(112,'Bathtub',4,216025,880,NULL),(113,'G Funk Intro',2,30112,95,NULL),(114,'Encore',4,385271,593,NULL),(115,'Change Clothes',4,7557119,4157,NULL),(116,'Dirt Off Your Shoulder',4,3041,41,NULL),(117,'Jimmy James',3,990586,340,NULL),(118,'Funky Boss',2,291527,984,NULL),(119,'Pass The Mic',4,307209,891,NULL),(120,'Wake Up Mr. West',0,412880,9236,NULL),(121,'Heard Em Say',3,472110856,545,NULL),(122,'Touch The Sky',4,452957,984,NULL),(123,'Give Me Your Love',8,267016,6,NULL),(124,'Pacific 212',3,30755,54,NULL),(125,'Why Can not We Live Together',4,2162505,157,NULL),(126,'The Jingle',4,440523,5352,NULL),(127,'Magic Tribe',3,42540796,9,NULL),(128,'Kimbo',5,938720,984,NULL),(129,'Cova Rosa',5,543440,642,NULL),(130,'Oscos',5,310024,54,NULL),(131,'Doiras',5,319672,98,NULL),(132,'Aus',9,481667,1164,NULL),(133,'Working',7,65968,5,NULL),(134,'Pain In The Ass',9,3227,158,NULL),(135,'Ignition Key',8,4819876,4985,NULL),(136,'The Convertion',2,1421912,54,NULL),(137,'Triangle',6,3200699,524545,NULL),(138,'Country Song',6,49580,880,NULL),(139,'Boys In The Hood',5,477856,95,NULL),(140,'Cloud Dancer',4,710247,39,NULL),(141,'Mariposa Tecknicolor',255,0,0,29),(142,'DuracionMala',3,0,0,20),(146,'One-Winged Angel',265,0,0,29);
/*!40000 ALTER TABLE `cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion_genero`
--

DROP TABLE IF EXISTS `cancion_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion_genero` (
  `cancion_genero_id` int NOT NULL AUTO_INCREMENT,
  `cancion_id` int DEFAULT NULL,
  `genero_id` int DEFAULT NULL,
  PRIMARY KEY (`cancion_genero_id`),
  UNIQUE KEY `unique_cancion_genero` (`cancion_id`,`genero_id`),
  UNIQUE KEY `idx_unique_cancion_genero` (`cancion_id`,`genero_id`),
  UNIQUE KEY `cancion_genero_cancion_id_genero_id` (`cancion_id`,`genero_id`),
  KEY `genero_id` (`genero_id`),
  CONSTRAINT `cancion_genero_ibfk_1` FOREIGN KEY (`cancion_id`) REFERENCES `cancion` (`cancion_id`),
  CONSTRAINT `cancion_genero_ibfk_2` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`genero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion_genero`
--

LOCK TABLES `cancion_genero` WRITE;
/*!40000 ALTER TABLE `cancion_genero` DISABLE KEYS */;
INSERT INTO `cancion_genero` VALUES (33,1,1),(36,2,1),(176,3,1),(177,3,3),(32,4,1),(34,5,1),(22,6,1),(23,6,2),(18,7,1),(19,7,2),(16,8,1),(17,8,2),(20,9,1),(21,9,2),(35,10,1),(11,11,2),(9,12,2),(2,14,2),(31,15,1),(37,16,1),(3,17,2),(4,18,2),(10,19,2),(7,20,2),(8,21,2),(1,22,2),(5,23,2),(6,24,2),(39,33,4),(42,34,4),(40,35,4),(43,36,4),(38,37,4),(41,38,4),(49,51,5),(45,52,5),(46,53,5),(47,54,5),(50,55,5),(48,56,5),(52,72,6),(64,73,6),(59,74,6),(57,75,6),(183,76,2),(60,76,6),(67,77,6),(53,78,6),(56,79,6),(58,80,6),(62,81,6),(182,82,2),(63,82,6),(61,83,6),(65,84,6),(55,85,6),(66,86,6),(54,87,6),(83,88,7),(97,89,7),(95,90,7),(87,91,7),(89,92,7),(91,93,7),(86,94,7),(90,95,7),(96,96,7),(85,97,7),(84,98,7),(100,99,7),(98,100,7),(92,101,7),(88,102,7),(99,103,7),(94,104,7),(93,105,7),(124,106,8),(126,107,8),(128,108,8),(121,109,8),(125,110,8),(117,111,8),(114,112,8),(120,113,8),(118,114,8),(115,115,8),(116,116,8),(123,117,8),(119,118,8),(127,119,8),(130,120,8),(122,121,8),(129,122,8),(151,123,9),(156,124,9),(161,125,9),(159,126,9),(154,127,9),(153,128,9),(149,129,9),(155,130,9),(150,131,9),(145,132,9),(162,133,9),(157,134,9),(152,135,9),(158,136,9),(160,137,9),(148,138,9),(146,139,9),(147,140,9),(193,146,12);
/*!40000 ALTER TABLE `cancion_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datos_pago_usuario`
--

DROP TABLE IF EXISTS `datos_pago_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_pago_usuario` (
  `datos_pago_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `forma_pago_id` int DEFAULT NULL,
  `cbu` varchar(50) DEFAULT NULL,
  `banco_codigo` varchar(20) DEFAULT NULL,
  `numero_tarjeta` varchar(20) DEFAULT NULL,
  `mes_caduca` int DEFAULT NULL,
  `anio_caduca` int DEFAULT NULL,
  `cvc` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`datos_pago_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `forma_pago_id` (`forma_pago_id`),
  CONSTRAINT `datos_pago_usuario_ibfk_2` FOREIGN KEY (`forma_pago_id`) REFERENCES `forma_pago` (`forma_pago_id`),
  CONSTRAINT `datos_pago_usuario_ibfk_3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datos_pago_usuario`
--

LOCK TABLES `datos_pago_usuario` WRITE;
/*!40000 ALTER TABLE `datos_pago_usuario` DISABLE KEYS */;
INSERT INTO `datos_pago_usuario` VALUES (1,1,1,NULL,'0',NULL,NULL,NULL,NULL),(2,1,2,NULL,'1','**** **** **** 1881',1,21,'***'),(3,2,3,NULL,'2','**** **** **** 8181',10,30,'***'),(4,3,3,NULL,'17','**** **** **** 0087',10,28,'***'),(5,4,1,NULL,'0',NULL,NULL,NULL,NULL),(6,1,3,NULL,'BANK01','**** **** **** 1234',12,2027,NULL);
/*!40000 ALTER TABLE `datos_pago_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discografica`
--

DROP TABLE IF EXISTS `discografica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discografica` (
  `discografica_id` int NOT NULL AUTO_INCREMENT,
  `nombre_discografica` varchar(255) NOT NULL,
  `pais_id` int DEFAULT NULL,
  PRIMARY KEY (`discografica_id`),
  UNIQUE KEY `idx_unique_nombre_pais` (`nombre_discografica`,`pais_id`),
  UNIQUE KEY `discografica_nombre_discografica_pais_id` (`nombre_discografica`,`pais_id`),
  KEY `pais_id` (`pais_id`),
  CONSTRAINT `discografica_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`pais_id`)
) ENGINE=InnoDB AUTO_INCREMENT=283 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discografica`
--

LOCK TABLES `discografica` WRITE;
/*!40000 ALTER TABLE `discografica` DISABLE KEYS */;
INSERT INTO `discografica` VALUES (249,'Aftermath Entertainment',1),(231,'Apple Records',2),(250,'Atlantic',1),(237,'Atlantic Recording Corporation',1),(236,'Atlantic Recording Corporation',4),(242,'BigHit Entertainment',6),(251,'Capitol Records',6),(252,'CBS',3),(253,'CBS Masterworks',7),(241,'Columbia Records',5),(254,'Commodore',1),(255,'Death Row Records',5),(256,'Decca',1),(257,'Detroit Underground',1),(258,'Dial Records',1),(259,'Diynamic Music',7),(235,'Elektra Records LLC',2),(230,'EMI',2),(247,'Epic Records.',4),(260,'Etcetera Records B.V.',8),(261,'Fania Records',1),(232,'Geffen Records',1),(262,'Inca Records',9),(248,'Internet Money Records',5),(243,'Interscope Records',3),(263,'M nus',6),(244,'Ministry of Sound Recordings Limited',5),(264,'Music Hall',10),(265,'Musicraft',1),(266,'Naxos Records',1),(267,'ND Nueva Direccion En La Cultura',10),(268,'NMC',2),(269,'Octave',2),(270,'Odeon',10),(271,'Prestige',1),(239,'RCA Records',3),(272,'RCA Victor Red Seal',7),(273,'REKIDS',7),(238,'Rimas Entertainment LLC',5),(274,'Riverside Records',1),(275,'Roc-A-Fella Records',6),(276,'Roc-A-Fella Records, Universal Music',5),(233,'Sire Warner Bros',1),(277,'Sony Music',14),(227,'Sony Music Entertainment',1),(278,'Stip Record',11),(279,'Tico Records',1),(280,'Trova',12),(281,'Truesoul',13),(282,'UA Latino',3),(234,'UMG Recordings',3),(240,'Universal International Music BV',2),(228,'Universal Music Group',1),(229,'Warner Music Group',1),(246,'White World Music',3),(245,'WK Records',1);
/*!40000 ALTER TABLE `discografica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pago` (
  `forma_pago_id` int NOT NULL AUTO_INCREMENT,
  `nombre_forma_pago` varchar(50) NOT NULL,
  PRIMARY KEY (`forma_pago_id`),
  UNIQUE KEY `nombre_forma_pago` (`nombre_forma_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pago`
--

LOCK TABLES `forma_pago` WRITE;
/*!40000 ALTER TABLE `forma_pago` DISABLE KEYS */;
INSERT INTO `forma_pago` VALUES (4,'Debito Automatico x Banco'),(1,'Efectivo'),(3,'Tarjeta de credito'),(2,'Tarjeta de Debito');
/*!40000 ALTER TABLE `forma_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `genero_id` int NOT NULL AUTO_INCREMENT,
  `nombre_genero` varchar(100) NOT NULL,
  PRIMARY KEY (`genero_id`),
  UNIQUE KEY `nombre_genero` (`nombre_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (12,'Epica'),(8,'Hip Hop'),(10,'Indie'),(5,'Jazz'),(4,'Música Clasica'),(2,'Pop'),(1,'Rock'),(6,'Salsa'),(3,'Soul'),(7,'Tango'),(9,'Techno');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `pago_id` int NOT NULL AUTO_INCREMENT,
  `fecha_pago` datetime NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `usuario_id` varchar(50) DEFAULT NULL,
  `forma_pago_id` int DEFAULT NULL,
  `estado` enum('completado','pendiente','fallido') DEFAULT 'completado',
  PRIMARY KEY (`pago_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `forma_pago_id` (`forma_pago_id`),
  CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`forma_pago_id`) REFERENCES `forma_pago` (`forma_pago_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,'2020-01-01 00:00:00',0.00,'1',1,'completado'),(2,'2020-02-01 00:00:00',0.00,'1',1,'completado'),(3,'2020-02-01 00:00:00',100.00,'2',3,'completado'),(4,'2020-03-01 00:00:00',0.00,'1',1,'completado'),(5,'2020-03-01 00:00:00',100.00,'6',3,'completado'),(6,'2025-09-30 21:00:00',100.00,'1',1,'completado'),(7,'2025-09-30 21:00:00',100.00,'1',1,'completado');
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `pais_id` int NOT NULL AUTO_INCREMENT,
  `nombre_pais` varchar(100) NOT NULL,
  PRIMARY KEY (`pais_id`),
  UNIQUE KEY `nombre_pais` (`nombre_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (7,'Alemania'),(10,'Argentina'),(5,'Brasil'),(6,'Canadá'),(4,'Chile'),(9,'Colombia'),(3,'España'),(1,'Estados Unidos'),(11,'Francia'),(8,'Holanda'),(2,'Inglaterra'),(14,'Mexico'),(13,'Suecia'),(12,'Uruguay');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `nombre_playlist` varchar(255) NOT NULL,
  `cantidad_canciones` int DEFAULT '0',
  `usuario_id` varchar(50) DEFAULT NULL,
  `estado` enum('activa','eliminada') DEFAULT 'activa',
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminacion` datetime DEFAULT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `chk_estado_fecha_playlist` CHECK ((((`estado` = _utf8mb4'activa') and (`fecha_eliminacion` is null)) or ((`estado` = _utf8mb4'eliminada') and (`fecha_eliminacion` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'Para correr',15,'1','eliminada','2020-02-27 00:00:00','2025-10-02 07:00:00'),(2,'Para Estudiar',10,'2','activa','2019-05-07 00:00:00',NULL),(3,'Para Gym',15,'4','eliminada','2020-03-07 00:00:00','2020-04-10 00:00:00'),(4,'Las mejores canciones',10,'5','eliminada','2017-06-06 00:00:00','2025-10-21 21:54:33'),(5,'Mis canciones favoritos',10,'2','activa','2016-09-29 00:00:00',NULL),(6,'Top 20',20,'12','eliminada','2016-04-04 00:00:00','2016-06-06 00:00:00'),(7,'Mi top 10',10,'11','activa','2017-06-16 00:00:00',NULL),(8,'Lo mejor del Rock',10,'17','activa','2018-07-11 00:00:00',NULL),(9,'Musica Latina',5,'15','eliminada','2016-02-19 00:00:00','2016-12-11 00:00:00'),(10,'Pop',6,'15','activa','2016-06-23 00:00:00',NULL),(21,'Para estudiar',1,'1','eliminada','2025-10-21 20:10:32','2025-10-22 07:00:00'),(22,'juegos',1,'22','eliminada','2025-10-21 21:24:40','2025-11-09 21:50:00'),(23,'para relajarse',1,'11','activa','2025-10-21 21:25:17',NULL);
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_cancion`
--

DROP TABLE IF EXISTS `playlist_cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_cancion` (
  `playlist_cancion_id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int DEFAULT NULL,
  `cancion_id` int DEFAULT NULL,
  `fecha_agregado` datetime DEFAULT CURRENT_TIMESTAMP,
  `orden` int DEFAULT NULL,
  `activa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`playlist_cancion_id`),
  UNIQUE KEY `unique_playlist_cancion` (`playlist_id`,`cancion_id`),
  UNIQUE KEY `idx_unique_playlist_cancion` (`playlist_id`,`cancion_id`),
  UNIQUE KEY `playlist_cancion_playlist_id_cancion_id` (`playlist_id`,`cancion_id`),
  KEY `cancion_id` (`cancion_id`),
  CONSTRAINT `playlist_cancion_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`playlist_id`),
  CONSTRAINT `playlist_cancion_ibfk_2` FOREIGN KEY (`cancion_id`) REFERENCES `cancion` (`cancion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_cancion`
--

LOCK TABLES `playlist_cancion` WRITE;
/*!40000 ALTER TABLE `playlist_cancion` DISABLE KEYS */;
INSERT INTO `playlist_cancion` VALUES (1,1,1,'2025-10-09 00:06:05',NULL,NULL),(2,1,134,'2025-10-09 00:06:05',NULL,NULL),(3,1,21,'2025-10-09 00:06:05',NULL,NULL),(4,1,74,'2025-10-09 00:06:05',NULL,NULL),(5,2,38,'2025-10-09 00:11:34',NULL,NULL),(6,2,41,'2025-10-09 00:11:34',NULL,NULL),(7,2,42,'2025-10-09 00:11:34',NULL,NULL),(13,3,45,'2025-10-09 02:36:41',NULL,NULL),(14,3,61,'2025-10-09 02:36:41',NULL,NULL),(15,3,21,'2025-10-09 02:36:41',NULL,NULL),(16,3,72,'2025-10-09 02:36:41',NULL,NULL),(17,3,1,'2025-10-09 02:36:41',NULL,NULL),(18,4,1,'2025-10-09 02:37:09',NULL,NULL),(19,4,2,'2025-10-09 02:37:09',NULL,NULL),(20,4,3,'2025-10-09 02:37:09',NULL,NULL),(21,4,5,'2025-10-09 02:37:09',NULL,NULL),(22,5,17,'2025-10-09 02:37:19',NULL,NULL),(23,5,25,'2025-10-09 02:37:19',NULL,NULL),(24,5,29,'2025-10-09 02:37:19',NULL,NULL),(25,6,5,'2025-10-09 02:38:02',NULL,NULL),(26,6,11,'2025-10-09 02:38:02',NULL,NULL),(27,6,105,'2025-10-09 02:38:02',NULL,NULL),(28,6,53,'2025-10-09 02:38:02',NULL,NULL),(29,6,61,'2025-10-09 02:38:02',NULL,NULL),(30,6,6,'2025-10-09 02:38:02',NULL,NULL),(31,6,8,'2025-10-09 02:38:02',NULL,NULL),(32,6,32,'2025-10-09 02:38:02',NULL,NULL),(33,6,40,'2025-10-09 02:38:02',NULL,NULL),(34,6,29,'2025-10-09 02:38:02',NULL,NULL),(35,7,54,'2025-10-09 02:38:36',NULL,NULL),(36,7,98,'2025-10-09 02:38:36',NULL,NULL),(37,7,82,'2025-10-09 02:38:36',NULL,NULL),(38,7,11,'2025-10-09 02:38:36',NULL,NULL),(39,7,36,'2025-10-09 02:38:36',NULL,NULL),(40,7,58,'2025-10-09 02:38:36',NULL,NULL),(41,7,48,'2025-10-09 02:38:36',NULL,NULL),(42,7,31,'2025-10-09 02:38:36',NULL,NULL),(43,7,18,'2025-10-09 02:38:36',NULL,NULL),(44,7,50,'2025-10-09 02:38:36',NULL,NULL),(45,8,5,'2025-10-09 02:39:11',NULL,NULL),(46,8,1,'2025-10-09 02:39:11',NULL,NULL),(47,8,4,'2025-10-09 02:39:11',NULL,NULL),(48,8,10,'2025-10-09 02:39:11',NULL,NULL),(49,8,15,'2025-10-09 02:39:11',NULL,NULL),(50,8,16,'2025-10-09 02:39:11',NULL,NULL),(51,9,18,'2025-10-09 02:39:25',NULL,NULL),(52,9,14,'2025-10-09 02:39:25',NULL,NULL),(53,9,19,'2025-10-09 02:39:25',NULL,NULL),(54,9,23,'2025-10-09 02:39:25',NULL,NULL),(55,9,22,'2025-10-09 02:39:25',NULL,NULL),(56,10,11,'2025-10-09 02:39:37',NULL,NULL),(57,10,19,'2025-10-09 02:39:37',NULL,NULL),(58,10,82,'2025-10-09 02:39:37',NULL,NULL),(59,10,129,'2025-10-09 02:39:37',NULL,NULL),(60,10,20,'2025-10-09 02:39:37',NULL,NULL),(61,21,1,'2025-10-21 20:18:04',1,0),(62,21,146,'2025-10-21 20:18:30',1,1),(63,22,146,'2025-10-21 21:29:06',1,1),(64,23,146,'2025-10-21 21:57:47',1,1);
/*!40000 ALTER TABLE `playlist_cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suscripcion`
--

DROP TABLE IF EXISTS `suscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suscripcion` (
  `suscripcion_id` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` datetime NOT NULL,
  `fecha_renovacion` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `usuario_id` varchar(50) DEFAULT NULL,
  `tipo_usuario_id` int DEFAULT NULL,
  `estado` enum('activa','cancelada','expirada') DEFAULT 'activa',
  PRIMARY KEY (`suscripcion_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `tipo_usuario_id` (`tipo_usuario_id`),
  CONSTRAINT `suscripcion_ibfk_2` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`tipo_usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suscripcion`
--

LOCK TABLES `suscripcion` WRITE;
/*!40000 ALTER TABLE `suscripcion` DISABLE KEYS */;
INSERT INTO `suscripcion` VALUES (1,'2020-01-01 00:00:00','2020-02-01 00:00:00',NULL,'1',3,'activa'),(2,'2020-02-01 00:00:00','2020-03-01 00:00:00',NULL,'1',3,'activa'),(3,'2020-02-01 00:00:00','2020-03-01 00:00:00',NULL,'6',2,'activa'),(4,'2020-03-01 00:00:00','2020-04-01 00:00:00',NULL,'1',3,'activa'),(5,'2020-03-01 00:00:00','2020-04-01 00:00:00',NULL,'6',2,'activa'),(6,'2025-09-30 21:00:00','2025-10-31 21:00:00',NULL,'5',3,'activa'),(7,'2025-09-30 21:00:00','2025-10-31 21:00:00',NULL,'21',1,'activa');
/*!40000 ALTER TABLE `suscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `tipo_usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`tipo_usuario_id`),
  UNIQUE KEY `nombre_tipo` (`nombre_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'free'),(3,'Premium'),(2,'standard');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(255) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` enum('M','F','O') DEFAULT NULL,
  `codigo_postal` varchar(20) DEFAULT NULL,
  `pais_id` int DEFAULT NULL,
  `tipo_usuario_id` int DEFAULT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(100) NOT NULL,
  `contrasenia_hash` varchar(255) NOT NULL,
  `fecha_ult_mod_password` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('activo','inactivo','eliminado') DEFAULT 'activo',
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `pais_id` (`pais_id`),
  KEY `tipo_usuario_id` (`tipo_usuario_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`pais_id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`tipo_usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'MARIA ORTIZ','1975-09-27','F','1001',10,3,'2020-01-01 00:00:00','mortiz@email.com','$2b$10$9AJvurGgFHGbXRYYm/1OpORrwiU.TKzq7WHEskLiIAGd8.pCVA5xG','2025-10-22 02:04:29','activo'),(2,'ISABEL BALLESTEROS','1987-10-17','F','1001',10,3,'2020-02-01 00:00:00','iballesteros@email.com','**************','2024-07-01 00:00:00','activo'),(3,'CARMEN RAMIREZ','1994-08-26','F','1001',10,3,'2020-03-01 00:00:00','cramirez@email.com','**********',NULL,'activo'),(4,'MARIA PAULA GONZALEZ','1981-03-27','F','118942',9,3,'2020-03-01 00:00:00','mgonzalez@email.com','***********','2025-10-15 04:52:37','activo'),(5,'EMILY HERNANDEZ','2001-02-10','F','118942',9,3,'2020-03-01 00:00:00','ehernandez@email.com','***********','2025-10-15 04:52:37','activo'),(6,'LUISA GOMEZ','1971-12-12','F','118942',9,2,'2020-03-01 00:00:00','lgomez@email.com','********','2025-10-15 04:52:37','activo'),(7,'MARIA CARMEN SOSA','1981-07-16','F','3',3,2,'2020-03-01 00:00:00','msosa@email.com','*******','2025-10-15 04:52:37','activo'),(8,'MARY SMITH','2000-05-04','F','B24',2,2,'2020-03-01 00:00:00','msmith@email.com','********','2025-10-15 04:52:37','activo'),(9,'PATRICIA SOTO','1974-07-12','F','8320000',4,1,'2020-03-01 00:00:00','psoto@email.com','*******','2025-10-15 04:52:37','activo'),(10,'ANTONIO GARCIA','1995-08-30','M','1001',10,3,'2020-03-01 00:00:00','agarcia@email.com','*********','2025-10-15 04:52:37','activo'),(11,'JOSE MARTINEZ','1987-11-22','M','1001',10,2,'2020-03-01 00:00:00','jmartinez@email.com','***********','2025-10-15 04:52:37','activo'),(12,'FRANCISCO LOPEZ','1988-02-16','M','1001',10,1,'2020-03-01 00:00:00','flopez@email.com','********','2025-10-15 04:52:37','activo'),(13,'JUAN SANCHEZ','2003-03-23','M','1001',10,1,'2020-03-01 00:00:00','jsanchez@email.com','**********','2025-10-15 04:52:37','activo'),(14,'MIGUEL ANGEL RODRIGUEZ','2003-10-16','M','118942',9,2,'2020-03-01 00:00:00','mrodriguez@email.com','************','2025-10-15 04:52:37','activo'),(15,'JUAN ESTEBAN DIAZ','1973-05-23','M','118942',9,3,'2020-03-01 00:00:00','jdiaz@email.com','*******','2025-10-15 04:52:37','activo'),(16,'JUAN SEBASTIAN LOPEZ','1974-03-15','M','118942',9,2,'2020-03-01 00:00:00','jlop ez@email.com','********','2025-10-15 04:52:37','activo'),(17,'SANTIAGO MARTINEZ','1977-07-18','M','118942',9,2,'2020-03-01 00:00:00','smartinez@email.com','***********','2025-10-15 04:52:37','activo'),(18,'DAVID RUBIO','2001-01-17','M','60000',12,2,'2020-03-01 00:00:00','drubio@email.com','********','2025-10-15 04:52:37','activo'),(19,'JHON WATSON','2003-10-22','M','10029',1,1,'2020-03-01 00:00:00','jwatson@email.com','*********','2025-10-15 04:52:37','activo'),(21,'ANA GARCIA','1995-05-19','F','4600',10,1,'2025-10-17 03:27:24','ana.garcia@example.com','$2b$10$0CxDVGZVlwHS3cDLH.j5qe1mTHjJIHzSaoS4v67IComfqquWqvzfy','2025-10-17 03:27:24','activo'),(22,'ANA MARIA GARCIA','1995-05-19','O','4600',1,1,'2025-10-21 21:13:25','ana.garcia.maria@gmail.com','$2b$10$ZhvNUbVMUMInaT1FG520XeP1jW3ebJ9H59ZR2VeEQzTTHj1kKPpJ6','2025-10-21 21:13:25','activo');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-22  4:10:41
