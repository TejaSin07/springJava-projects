package com.app.todoapp.controller;
//Note How to create class and package both at a time
//--> go for new class --> give name as "packaageName.classname

import com.app.todoapp.model.Task;
import com.app.todoapp.service.TaskService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public String getTasks(Model model){
        List<Task> tasks = taskService.getAllTasks();
        model.addAttribute("tasks",tasks);
        return "tasks";
    }

    @PostMapping
    public String createTasks(@RequestParam String title){
        taskService.createTasks(title);
        return "redirect:/";
    }
    @GetMapping("/{id}/delete")
    public String deleteTasks(@PathVariable Long id){
        taskService.deleterTask(id);
        return "redirect:/";
    }
    @GetMapping("/{id}/toggle")
    public String toggleTasks(@PathVariable Long id){
        taskService.toggleTask(id);
        return "redirect:/";
    }

}
