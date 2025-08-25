package com.cropmanager.controller;

import com.cropmanager.dto.StockBuildupDTO;
import com.cropmanager.model.StockBuildup;
import com.cropmanager.service.StickingPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sticking-plans")
public class StickingPlanController {

    @Autowired
    private StickingPlanService stickingPlanService;

    @PostMapping
    public ResponseEntity<StockBuildup> createStickingPlan(@RequestBody StockBuildupDTO stickingPlanDTO) {
        StockBuildup newStickingPlan = stickingPlanService.createStickingPlan(stickingPlanDTO);
        return new ResponseEntity<>(newStickingPlan, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StockBuildup>> getAllStickingPlans() {
        List<StockBuildup> stickingPlans = stickingPlanService.getAllStickingPlans();
        return ResponseEntity.ok(stickingPlans);
    }

    // Add other methods like update and delete as needed
}