package com.cropmanager.repository;

import com.cropmanager.model.StickingPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StickingPlanRepository extends JpaRepository<StickingPlan, Long> {
}