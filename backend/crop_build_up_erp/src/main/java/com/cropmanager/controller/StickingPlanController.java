package com.cropmanager.controller;

import com.cropmanager.model.StickingPlan;
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
    public ResponseEntity<StickingPlan> createStickingPlan(@RequestBody StickingPlan stickingPlan) {
        try {
            StickingPlan newPlan = stickingPlanService.createStickingPlan(stickingPlan);
            return new ResponseEntity<>(newPlan, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<StickingPlan>> getAllStickingPlans() {
        List<StickingPlan> plans = stickingPlanService.getAllStickingPlans();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }
}