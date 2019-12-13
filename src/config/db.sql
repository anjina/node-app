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

-- Dumping structure for table dialy_pay.label
CREATE TABLE IF NOT EXISTS `label` (
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名称',
  `storeId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '仓库id',
  `creator` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建者',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table dialy_pay.label: ~0 rows (大约)
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
INSERT INTO `label` (`name`, `storeId`, `creator`, `createTime`, `updateTime`) VALUES
	('人情往来', '13510099014_15770670930', '13510099014', '2019-12-10 20:43:19', '2019-12-10 20:43:19'),
	('出行', '13510099014_15770670930', '13510099014', '2019-12-10 20:08:01', '2019-12-12 22:16:35'),
	('工资', '13510099014_15770670930', '13510099014', '2019-12-11 16:04:26', '2019-12-11 16:04:26');
/*!40000 ALTER TABLE `label` ENABLE KEYS */;

-- Dumping structure for table dialy_pay.message
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromId` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发送者',
  `toId` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '接收者',
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '消息内容',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '消息类型，0为文本消息，1为牵手邀约',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否被删除，0为否，1为是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table dialy_pay.message: ~2 rows (大约)
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` (`id`, `fromId`, `toId`, `message`, `createTime`, `updateTime`, `type`, `status`) VALUES
	(15, '13510099014', '15770670930', NULL, '2019-12-06 19:39:27', '2019-12-06 19:39:27', 1, 0),
	(16, '15770670930', '13510099014', 'Dialy1575364084已答应！恭喜~', '2019-12-06 19:39:32', '2019-12-06 19:39:32', 0, 0);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;

-- Dumping structure for table dialy_pay.pay_record
CREATE TABLE IF NOT EXISTS `pay_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '账单id',
  `money` double(11,2) NOT NULL COMMENT '金额',
  `type` tinyint(1) NOT NULL COMMENT '类型，默认0为支出，1为收入',
  `creator` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建人',
  `imgsUrl` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图片',
  `label` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签',
  `date` timestamp NULL DEFAULT NULL COMMENT '日期，',
  `location` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地点',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态，默认0, 1表示已删除',
  `remark` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `storeId` varchar(128) NOT NULL COMMENT '所属共同账单id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table dialy_pay.pay_record: ~0 rows (大约)
/*!40000 ALTER TABLE `pay_record` DISABLE KEYS */;
INSERT INTO `pay_record` (`id`, `money`, `type`, `creator`, `imgsUrl`, `label`, `date`, `location`, `createTime`, `updateTime`, `status`, `remark`, `storeId`) VALUES
	(8, 12.00, 0, '13510099014', '/static/image/pay/1575985206473.jpg,/static/image/pay/1575985206476.jpg', '人情往来', '2019-12-11 21:39:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-10 21:40:06', '2019-12-11 15:03:57', 0, '测试哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈', '13510099014_15770670930'),
	(10, 12.00, 0, '13510099014', '/static/image/pay/1575985259028.jpg,/static/image/pay/1575985259030.jpg', '人情往来', '2019-12-10 00:00:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-10 21:40:59', '2019-12-11 15:04:01', 0, '测试哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈', '13510099014_15770670930'),
	(11, 12.00, 0, '13510099014', '/static/image/pay/1575985264568.jpg,/static/image/pay/1575985264570.jpg', '人情往来', '2019-12-10 02:00:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-10 21:41:04', '2019-12-11 15:04:03', 0, '测试哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈', '13510099014_15770670930'),
	(12, 12.00, 0, '13510099014', '/static/image/pay/1575985274549.jpg,/static/image/pay/1575985274551.jpg', '人情往来', '2019-12-11 00:00:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-10 21:41:14', '2019-12-11 15:04:04', 0, '测试哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈', '13510099014_15770670930'),
	(13, 129.90, 1, '13510099014', '', '工资', '2019-12-11 16:03:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-11 16:04:26', '2019-12-11 17:45:00', 0, '工资收入啊哈哈哈哈哈哈哈哈', '13510099014_15770670930'),
	(14, 10.00, 0, '13510099014', '', '出行', '2019-12-11 21:23:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-11 21:24:40', '2019-12-11 21:24:40', 0, '123', '13510099014_15770670930'),
	(15, 11.00, 0, '13510099014', '', '出行', '2019-12-11 21:29:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-11 21:29:56', '2019-12-11 21:29:56', 0, '12', '13510099014_15770670930'),
	(16, 123.00, 1, '13510099014', '', '工资', '2019-12-11 21:31:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-11 21:31:16', '2019-12-11 21:31:16', 0, '123', '13510099014_15770670930'),
	(17, 122.00, 0, '13510099014', '', '人情往来', '2019-12-11 21:35:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-11 21:35:37', '2019-12-11 21:35:37', 0, '123456', '13510099014_15770670930'),
	(18, 2.00, 0, '13510099014', '', '人情往来', '2019-12-11 21:42:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-11 21:42:55', '2019-12-11 21:42:55', 0, '123', '13510099014_15770670930'),
	(19, 22.00, 0, '13510099014', '', '出行', '2019-12-11 21:43:00', '广东省深圳市南山区粤海街道乐享中心B座航天科技广场', '2019-12-11 21:43:10', '2019-12-11 21:43:10', 0, '123', '13510099014_15770670930'),
	(20, 4.00, 0, '15770670930', '', '出行', '2019-12-12 09:46:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-12 09:47:12', '2019-12-12 22:16:19', 0, '123', '13510099014_15770670930'),
	(21, 12.00, 0, '13510099014', '', '出行', '2019-12-12 22:16:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-12 22:16:35', '2019-12-12 22:16:35', 0, '12', '13510099014_15770670930'),
	(22, 1222.00, 0, '13510099014', '', '出行', '2019-12-13 09:39:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-13 09:39:25', '2019-12-13 09:45:59', 0, '', '13510099014_15770670930'),
	(23, 12.00, 1, '13510099014', '', '出行', '2019-12-13 09:39:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-13 09:39:32', '2019-12-13 09:39:32', 0, '', '13510099014_15770670930'),
	(28, 1.00, 0, '13510099014', '', '人情往来', '2019-12-13 10:33:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-13 10:34:07', '2019-12-13 10:34:07', 0, '1', '13510099014_15770670930'),
	(29, 1.00, 1, '13510099014', '/static/image/pay/1576204531838.jpg', '出行', '2019-12-13 10:35:00', '广东省深圳市南山区粤海街道求贤阁深圳人才公园', '2019-12-13 10:35:31', '2019-12-13 10:35:31', 0, '1', '13510099014_15770670930');
/*!40000 ALTER TABLE `pay_record` ENABLE KEYS */;

-- Dumping structure for table dialy_pay.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `phoneNum` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `sign` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '签名',
  `avatar` varchar(2048) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像',
  `nickName` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `lover` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '恋人id',
  `hasNewMsg` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否有新消息，0为无，1为有',
  `storeId` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '账单Id',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `phoneNum` (`phoneNum`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table dialy_pay.user: ~2 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `phoneNum`, `password`, `sign`, `avatar`, `nickName`, `lover`, `hasNewMsg`, `storeId`, `updateTime`, `createTime`) VALUES
	(1, '13510099014', NULL, '此人很懒，什么都没有留下', '/static/image/avatar_1576053869380.png', 'Dialy1575364052', '15770670930', 0, '13510099014_15770670930', '2019-12-11 16:44:29', '2019-12-03 17:07:32'),
	(2, '15770670930', NULL, '此人很懒，什么都没有留下', NULL, 'Dialy1575364084', '13510099014', 0, '13510099014_15770670930', '2019-12-06 19:39:32', '2019-12-03 17:08:04');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
