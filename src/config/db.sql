-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.17 - MySQL Community Server - GPL
-- 服务器OS:                        Win64
-- HeidiSQL 版本:                  10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dialy_pay
CREATE DATABASE IF NOT EXISTS `dialy_pay` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dialy_pay`;

-- Dumping structure for table dialy_pay.message
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(64) NOT NULL COMMENT '用户id',
  `message` text NOT NULL COMMENT '消息内容',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否被删除，0为否，1为是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dialy_pay.message: ~0 rows (大约)
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;

-- Dumping structure for table dialy_pay.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `phoneNum` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `sign` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '签名',
  `avatar` varchar(2048) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像',
  `nickName` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `lover` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '恋人id',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phoneNum` (`phoneNum`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table dialy_pay.user: ~10 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `phoneNum`, `password`, `sign`, `avatar`, `nickName`, `lover`, `updateTime`, `createTime`) VALUES
	(1, '13510099014', NULL, NULL, NULL, NULL, NULL, '2019-11-28 18:03:50', '2019-11-28 18:03:50'),
	(2, '15770670930', NULL, NULL, NULL, NULL, NULL, '2019-11-28 18:05:15', '2019-11-28 18:05:15');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
