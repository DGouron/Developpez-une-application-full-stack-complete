package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends CrudRepository<Subscription, Integer> {
    List<Subscription> findByUser(User user);
    Optional<Subscription> findByUserAndTheme(User user, Theme theme);
    boolean existsByUserAndTheme(User user, Theme theme);
} 