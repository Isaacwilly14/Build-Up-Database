package com.cropmanager.controller;

import com.cropmanager.dto.CropDTO;
import com.cropmanager.model.Crop;
import com.cropmanager.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/crops")
public class CropController {
    @Autowired
    private CropService cropService;
    @PostMapping
    public ResponseEntity<Crop> createCrop(@RequestBody CropDTO cropDTO) {
        Crop savedCrop = cropService.createCrop(cropDTO);
        return new ResponseEntity<>(savedCrop, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropService.getAllCrops());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Crop> getCropById(@PathVariable String id) {
        Optional<Crop> crop = cropService.getCropById(id);
        return crop.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Crop> updateCrop(@PathVariable String id, @RequestBody CropDTO cropDTO) {
        Crop updatedCrop = cropService.updateCrop(id, cropDTO);
        if (updatedCrop != null) {
            return ResponseEntity.ok(updatedCrop);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable String id) {
        cropService.deleteCrop(id);
        return ResponseEntity.noContent().build();
    }
}