package com.cropmanager.repository;

import com.cropmanager.model.Variety;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VarietyRepository extends JpaRepository<Variety, Long> {
    
    // This method checks if a Variety exists by its varietyCode
    boolean existsByVarietyCode(String varietyCode);
}