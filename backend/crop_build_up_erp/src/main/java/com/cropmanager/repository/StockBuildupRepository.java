package com.cropmanager.repository;

import com.cropmanager.model.StockBuildup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockBuildupRepository extends JpaRepository<StockBuildup, Long> {
}