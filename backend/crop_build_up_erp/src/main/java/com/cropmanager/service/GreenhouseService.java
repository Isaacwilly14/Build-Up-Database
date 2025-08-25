package com.cropmanager.service;

import com.cropmanager.dto.GreenhouseDTO;
import com.cropmanager.model.Greenhouse;
import com.cropmanager.repository.GreenhouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class GreenhouseService {
    @Autowired
    private GreenhouseRepository greenhouseRepository;

    public Greenhouse createGreenhouse(GreenhouseDTO greenhouseDTO) {
        Greenhouse greenhouse = new Greenhouse();
        greenhouse.setGreenhouse(greenhouseDTO.getGreenhouse());
        greenhouse.setTotalOfBedsRightSide(greenhouseDTO.getTotalOfBedsRightSide());
        greenhouse.setTotalOfBedsLeftSide(greenhouseDTO.getTotalOfBedsLeftSide());
        greenhouse.setTotalOfBeds(greenhouseDTO.getTotalOfBeds());
        greenhouse.setTotalMPerBedXLeftSide(greenhouseDTO.getTotalMPerBedXLeftSide());
        greenhouse.setTotalMPerBedXRightSide(greenhouseDTO.getTotalMPerBedXRightSide());
        greenhouse.setTotalMP(greenhouseDTO.getTotalMP());
        return greenhouseRepository.save(greenhouse);
    }

    public List<Greenhouse> getAllGreenhouses() {
        return greenhouseRepository.findAll();
    }

    public Optional<Greenhouse> getGreenhouseById(String id) {
        return greenhouseRepository.findById(id);
    }

    public Greenhouse updateGreenhouse(String id, GreenhouseDTO greenhouseDTO) {
        return greenhouseRepository.findById(id).map(greenhouse -> {
            greenhouse.setTotalOfBedsRightSide(greenhouseDTO.getTotalOfBedsRightSide());
            greenhouse.setTotalOfBedsLeftSide(greenhouseDTO.getTotalOfBedsLeftSide());
            greenhouse.setTotalOfBeds(greenhouseDTO.getTotalOfBeds());
            greenhouse.setTotalMPerBedXLeftSide(greenhouseDTO.getTotalMPerBedXLeftSide());
            greenhouse.setTotalMPerBedXRightSide(greenhouseDTO.getTotalMPerBedXRightSide());
            greenhouse.setTotalMP(greenhouseDTO.getTotalMP());
            return greenhouseRepository.save(greenhouse);
        }).orElse(null);
    }

    public void deleteGreenhouse(String id) {
        greenhouseRepository.deleteById(id);
    }
}