package com.dhruv.railway.payment;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class IdempotencyStore {
    private static final Set<String> processed = ConcurrentHashMap.newKeySet();

    public static boolean allreadyProcessed(String txdId) {
        return !processed.add(txdId);
    }
}