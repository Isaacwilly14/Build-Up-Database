package com.cropmanager.controller;

import com.cropmanager.model.Crop;
import com.cropmanager.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    @Autowired
    private CropRepository cropRepository;

    @GetMapping
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Crop> getCropById(@PathVariable Long id) {
        Optional<Crop> crop = cropRepository.findById(id);
        return crop.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Crop createCrop(@RequestBody Crop crop) {
        return cropRepository.save(crop);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Crop> updateCrop(@PathVariable Long id, @RequestBody Crop cropDetails) {
        Optional<Crop> optionalCrop = cropRepository.findById(id);
        if (optionalCrop.isPresent()) {
            Crop existingCrop = optionalCrop.get();
            existingCrop.setCropCode(cropDetails.getCropCode());
            existingCrop.setSubGroup(cropDetails.getSubGroup());
            existingCrop.setCropName(cropDetails.getCropName());
            existingCrop.setSeasonCode(cropDetails.getSeasonCode());
            return ResponseEntity.ok(cropRepository.save(existingCrop));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable Long id) {
        if (cropRepository.existsById(id)) {
            cropRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}