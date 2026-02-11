package com.dhruv.railway.broker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class MessageBroker {
    private static final Logger log = LoggerFactory.getLogger(MessageBroker.class);
    private static final Map<String, List<SimpleQueue>> TOPICS = new HashMap<>();

    public static void subscribe(String topic, SimpleQueue queue) {
        TOPICS.computeIfAbsent(topic, k -> new ArrayList<>()).add(queue);
        log.info("Subscribed queue to topic [{}]", topic);
    }

    public static void publish(String topic, Object message) {
        List<SimpleQueue> queues = TOPICS.get(topic);
        if (queues != null) {
            queues.forEach(q -> q.enqueue(message));
            log.info("Published message to topic [{}]", topic);
        }
    }
}