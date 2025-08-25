package com.cropmanager.controller;

import com.cropmanager.dto.GreenhouseDTO;
import com.cropmanager.model.Greenhouse;
import com.cropmanager.service.GreenhouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/greenhouses")
public class GreenhouseController {
    @Autowired
    private GreenhouseService greenhouseService;
    @PostMapping
    public ResponseEntity<Greenhouse> createGreenhouse(@RequestBody GreenhouseDTO greenhouseDTO) {
        Greenhouse savedGreenhouse = greenhouseService.createGreenhouse(greenhouseDTO);
        return new ResponseEntity<>(savedGreenhouse, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Greenhouse>> getAllGreenhouses() {
        return ResponseEntity.ok(greenhouseService.getAllGreenhouses());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Greenhouse> getGreenhouseById(@PathVariable String id) {
        Optional<Greenhouse> greenhouse = greenhouseService.getGreenhouseById(id);
        return greenhouse.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Greenhouse> updateGreenhouse(@PathVariable String id, @RequestBody GreenhouseDTO greenhouseDTO) {
        Greenhouse updatedGreenhouse = greenhouseService.updateGreenhouse(id, greenhouseDTO);
        if (updatedGreenhouse != null) {
            return ResponseEntity.ok(updatedGreenhouse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGreenhouse(@PathVariable String id) {
        greenhouseService.deleteGreenhouse(id);
        return ResponseEntity.noContent().build();
    }
}