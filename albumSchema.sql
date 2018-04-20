-- sample row
-- 1,The Beatles,Sgt Pepper's Lonely Hearts Club Band,1967,62.984,29.233,13.31,8.757,0.553

USE tsongsDB;

CREATE TABLE topAlbums (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  album VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);
