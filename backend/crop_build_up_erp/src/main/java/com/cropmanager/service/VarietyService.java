package com.cropmanager.service;

import com.cropmanager.dto.VarietyDTO;
import com.cropmanager.model.Variety;
import com.cropmanager.repository.VarietyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VarietyService {
    @Autowired
    private VarietyRepository varietyRepository;

    public Variety createVariety(VarietyDTO varietyDTO) {
        Variety variety = new Variety();
        variety.setVarietyCode(varietyDTO.getVarietyCode());
        variety.setCropCode(varietyDTO.getCropCode());
        variety.setVarietyName(varietyDTO.getVarietyName());
        return varietyRepository.save(variety);
    }

    public List<Variety> getAllVarieties() {
        return varietyRepository.findAll();
    }

    public Optional<Variety> getVarietyById(String id) {
        return varietyRepository.findById(id);
    }

    public Variety updateVariety(String id, VarietyDTO varietyDTO) {
        return varietyRepository.findById(id).map(variety -> {
            variety.setCropCode(varietyDTO.getCropCode());
            variety.setVarietyName(varietyDTO.getVarietyName());
            return varietyRepository.save(variety);
        }).orElse(null);
    }

    public void deleteVariety(String id) {
        varietyRepository.deleteById(id);
    }
}