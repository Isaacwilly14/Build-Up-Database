package com.cropmanager.controller;

import com.cropmanager.model.Season;
import com.cropmanager.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seasons")
public class SeasonController {

    @Autowired
    private SeasonRepository seasonRepository;

    @GetMapping
    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Season> getSeasonById(@PathVariable Long id) {
        Optional<Season> season = seasonRepository.findById(id);
        return season.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Season createSeason(@RequestBody Season season) {
        return seasonRepository.save(season);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Season> updateSeason(@PathVariable Long id, @RequestBody Season seasonDetails) {
        Optional<Season> optionalSeason = seasonRepository.findById(id);
        if (optionalSeason.isPresent()) {
            Season existingSeason = optionalSeason.get();
            existingSeason.setSeasonCode(seasonDetails.getSeasonCode());
            existingSeason.setSeasonName(seasonDetails.getSeasonName());
            existingSeason.setDescription(seasonDetails.getDescription());
            existingSeason.setComment(seasonDetails.getComment());
            return ResponseEntity.ok(seasonRepository.save(existingSeason));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeason(@PathVariable Long id) {
        if (seasonRepository.existsById(id)) {
            seasonRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}