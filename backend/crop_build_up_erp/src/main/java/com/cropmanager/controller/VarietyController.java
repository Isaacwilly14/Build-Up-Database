package com.cropmanager.controller;

import com.cropmanager.model.Variety;
import com.cropmanager.repository.VarietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/varieties")
public class VarietyController {

    @Autowired
    private VarietyRepository varietyRepository;

    @GetMapping
    public List<Variety> getAllVarieties() {
        return varietyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Variety> getVarietyById(@PathVariable Long id) {
        Optional<Variety> variety = varietyRepository.findById(id);
        return variety.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Variety createVariety(@RequestBody Variety variety) {
        if (variety.getVarietyCode() != null && variety.getVarietyCode().length() >= 2) {
            variety.setCropCode(variety.getVarietyCode().substring(0, 2));
        }
        return varietyRepository.save(variety);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Variety> updateVariety(@PathVariable Long id, @RequestBody Variety varietyDetails) {
        Optional<Variety> optionalVariety = varietyRepository.findById(id);
        if (optionalVariety.isPresent()) {
            Variety existingVariety = optionalVariety.get();
            existingVariety.setVarietyCode(varietyDetails.getVarietyCode());
            existingVariety.setVarietyName(varietyDetails.getVarietyName());
            existingVariety.setSubGroup(varietyDetails.getSubGroup()); // Add this line
            
            if (varietyDetails.getVarietyCode() != null && varietyDetails.getVarietyCode().length() >= 2) {
                existingVariety.setCropCode(varietyDetails.getVarietyCode().substring(0, 2));
            }
            return ResponseEntity.ok(varietyRepository.save(existingVariety));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVariety(@PathVariable Long id) {
        if (varietyRepository.existsById(id)) {
            varietyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}