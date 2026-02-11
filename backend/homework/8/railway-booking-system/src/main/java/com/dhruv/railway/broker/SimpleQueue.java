package com.dhruv.railway.broker;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class SimpleQueue {
    private final BlockingQueue<Object> queue = new LinkedBlockingQueue<>();

    public void enqueue(Object message) {
        queue.offer(message);
    }

    public Object dequeue() throws InterruptedException {
        return queue.take();
    }

}
