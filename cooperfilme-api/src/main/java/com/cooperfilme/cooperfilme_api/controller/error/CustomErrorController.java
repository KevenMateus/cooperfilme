package com.cooperfilme.cooperfilme_api.controller.error;

import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {

    public CustomErrorController(ErrorAttributes errorAttributes) {
    }

    @RequestMapping("/error")
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleError(HttpServletRequest request, Model model) {
        Throwable error = (Throwable) request.getAttribute("javax.servlet.error.exception");
        HttpStatus status = getStatus(request);

        model.addAttribute("status", status.value());
        model.addAttribute("error", status.getReasonPhrase());
        model.addAttribute("message", error != null ? error.getMessage() : "Erro desconhecido");

        if (status == HttpStatus.NOT_FOUND) {
            return "error-404";
        }
        return "error";
    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode != null) {
            return HttpStatus.valueOf(statusCode);
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
