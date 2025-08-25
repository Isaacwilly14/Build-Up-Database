package com.cropmanager.service;

import com.cropmanager.dto.StockBuildupDTO;
import com.cropmanager.model.StockBuildup;
import com.cropmanager.repository.StockBuildupRepository;
import com.cropmanager.repository.VarietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StickingPlanService {

    @Autowired
    private StockBuildupRepository stockBuildupRepository;

    @Autowired
    private VarietyRepository varietyRepository;

    public StockBuildup createStickingPlan(StockBuildupDTO dto) {
        if (!varietyRepository.existsByVarietyCode(dto.getVarietyCode())) {
            return null; // Handle error appropriately
        }
        StockBuildup stickingPlan = new StockBuildup();
        stickingPlan.setVarietyCode(dto.getVarietyCode());
        return stockBuildupRepository.save(stickingPlan);
    }
    
    // NEW METHOD TO RESOLVE COMPILATION ERROR
    public List<StockBuildup> getAllStickingPlans() {
        return stockBuildupRepository.findAll();
    }
}