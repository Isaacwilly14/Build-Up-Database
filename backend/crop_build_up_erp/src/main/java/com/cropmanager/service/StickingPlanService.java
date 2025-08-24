package com.cropmanager.service;

import com.cropmanager.model.StickingPlan;
import com.cropmanager.repository.StickingPlanRepository;
import com.cropmanager.repository.VarietyRepository;
import com.cropmanager.repository.GreenhouseRepository; // Import the GreenhouseRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StickingPlanService {

    @Autowired
    private StickingPlanRepository stickingPlanRepository;

    @Autowired
    private VarietyRepository varietyRepository;

    @Autowired
    private GreenhouseRepository greenhouseRepository; // Autowire the GreenhouseRepository

    public StickingPlan createStickingPlan(StickingPlan stickingPlan) {
        // Validation Checks
        if (stickingPlan.getVarietyCode() == null || stickingPlan.getVarietyCode().isEmpty()) {
            throw new IllegalArgumentException("VarietyCode cannot be null or empty.");
        }
        if (!varietyRepository.existsByVarietyCode(stickingPlan.getVarietyCode())) {
            throw new IllegalArgumentException("VarietyCode not found in tblVarieties.");
        }
        
        // New Validation Check for Greenhouse
        if (stickingPlan.getGreenhouse() == null || stickingPlan.getGreenhouse().isEmpty()) {
            throw new IllegalArgumentException("Greenhouse cannot be null or empty.");
        }
        if (!greenhouseRepository.existsById(stickingPlan.getGreenhouse())) {
            throw new IllegalArgumentException("Greenhouse not found in tblGreenhouses.");
        }

        // Calculations
        if (stickingPlan.getMpQuantity() != null && stickingPlan.getUrcPerBag() != null) {
            stickingPlan.setUrcQuantity((double) stickingPlan.getMpQuantity() * stickingPlan.getUrcPerBag());
        }

        if (stickingPlan.getLossPercentage() != null && stickingPlan.getUrcQuantity() != null) {
            stickingPlan.setTotalLosses(stickingPlan.getUrcQuantity() * stickingPlan.getLossPercentage());
        }

        if (stickingPlan.getUrcQuantity() != null && stickingPlan.getTotalLosses() != null) {
            stickingPlan.setRcsQuantity((int) (stickingPlan.getUrcQuantity() - stickingPlan.getTotalLosses()));
        }
        
        return stickingPlanRepository.save(stickingPlan);
    }

    public List<StickingPlan> getAllStickingPlans() {
        return stickingPlanRepository.findAll();
    }
}