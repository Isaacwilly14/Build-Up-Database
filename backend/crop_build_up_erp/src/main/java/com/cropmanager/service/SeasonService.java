package com.cropmanager.service;

import com.cropmanager.dto.SeasonDTO;
import com.cropmanager.model.Season;
import com.cropmanager.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SeasonService {
    @Autowired
    private SeasonRepository seasonRepository;

    public Season createSeason(SeasonDTO seasonDTO) {
        Season season = new Season();
        season.setSeasonCode(seasonDTO.getSeasonCode());
        season.setSeasonName(seasonDTO.getSeasonName());
        season.setDescription(seasonDTO.getDescription());
        season.setComment(seasonDTO.getComment());
        return seasonRepository.save(season);
    }

    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    public Optional<Season> getSeasonById(String id) {
        return seasonRepository.findById(id);
    }

    public Season updateSeason(String id, SeasonDTO seasonDTO) {
        return seasonRepository.findById(id).map(season -> {
            season.setSeasonName(seasonDTO.getSeasonName());
            season.setDescription(seasonDTO.getDescription());
            season.setComment(seasonDTO.getComment());
            return seasonRepository.save(season);
        }).orElse(null);
    }

    public void deleteSeason(String id) {
        seasonRepository.deleteById(id);
    }
}