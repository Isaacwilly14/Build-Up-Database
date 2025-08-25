package com.cropmanager.service;

import com.cropmanager.dto.CropDTO;
import com.cropmanager.model.Crop;
import com.cropmanager.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CropService {
    @Autowired
    private CropRepository cropRepository;

    public Crop createCrop(CropDTO cropDTO) {
        Crop crop = new Crop();
        crop.setCropCode(cropDTO.getCropCode());
        crop.setSubGroup(cropDTO.getSubGroup());
        crop.setCropName(cropDTO.getCropName());
        crop.setSeasonCode(cropDTO.getSeasonCode());
        return cropRepository.save(crop);
    }

    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    public Optional<Crop> getCropById(String id) {
        return cropRepository.findById(id);
    }

    public Crop updateCrop(String id, CropDTO cropDTO) {
        return cropRepository.findById(id).map(crop -> {
            crop.setSubGroup(cropDTO.getSubGroup());
            crop.setCropName(cropDTO.getCropName());
            crop.setSeasonCode(cropDTO.getSeasonCode());
            return cropRepository.save(crop);
        }).orElse(null);
    }

    public void deleteCrop(String id) {
        cropRepository.deleteById(id);
    }
}