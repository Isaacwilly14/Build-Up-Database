package com.cropmanager.controller;

import com.cropmanager.dto.SeasonDTO;
import com.cropmanager.model.Season;
import com.cropmanager.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seasons")
public class SeasonController {
    @Autowired
    private SeasonService seasonService;
    @PostMapping
    public ResponseEntity<Season> createSeason(@RequestBody SeasonDTO seasonDTO) {
        Season savedSeason = seasonService.createSeason(seasonDTO);
        return new ResponseEntity<>(savedSeason, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Season>> getAllSeasons() {
        return ResponseEntity.ok(seasonService.getAllSeasons());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Season> getSeasonById(@PathVariable String id) {
        Optional<Season> season = seasonService.getSeasonById(id);
        return season.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Season> updateSeason(@PathVariable String id, @RequestBody SeasonDTO seasonDTO) {
        Season updatedSeason = seasonService.updateSeason(id, seasonDTO);
        if (updatedSeason != null) {
            return ResponseEntity.ok(updatedSeason);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeason(@PathVariable String id) {
        seasonService.deleteSeason(id);
        return ResponseEntity.noContent().build();
    }
}