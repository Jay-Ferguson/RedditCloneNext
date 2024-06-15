CREATE TABLE `Vote` (
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('UP','DOWN') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`,`postId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
