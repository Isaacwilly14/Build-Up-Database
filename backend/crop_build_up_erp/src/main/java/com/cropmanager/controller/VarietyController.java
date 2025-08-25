package com.cropmanager.controller;

import com.cropmanager.dto.VarietyDTO;
import com.cropmanager.model.Variety;
import com.cropmanager.service.VarietyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/varieties")
public class VarietyController {
    @Autowired
    private VarietyService varietyService;
    @PostMapping
    public ResponseEntity<Variety> createVariety(@RequestBody VarietyDTO varietyDTO) {
        Variety savedVariety = varietyService.createVariety(varietyDTO);
        return new ResponseEntity<>(savedVariety, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Variety>> getAllVarieties() {
        return ResponseEntity.ok(varietyService.getAllVarieties());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Variety> getVarietyById(@PathVariable String id) {
        Optional<Variety> variety = varietyService.getVarietyById(id);
        return variety.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Variety> updateVariety(@PathVariable String id, @RequestBody VarietyDTO varietyDTO) {
        Variety updatedVariety = varietyService.updateVariety(id, varietyDTO);
        if (updatedVariety != null) {
            return ResponseEntity.ok(updatedVariety);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVariety(@PathVariable String id) {
        varietyService.deleteVariety(id);
        return ResponseEntity.noContent().build();
    }
}