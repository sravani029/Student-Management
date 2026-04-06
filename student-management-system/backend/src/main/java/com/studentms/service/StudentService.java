package com.studentms.service;

import com.studentms.entity.Student;
import com.studentms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public Page<Student> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Optional<Student> getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId);
    }

    public Student createStudent(Student student) {
        // Check if student ID already exists
        if (studentRepository.existsByStudentId(student.getStudentId())) {
            throw new RuntimeException("Student ID already exists: " + student.getStudentId());
        }
        
        student.setCreatedAt(LocalDateTime.now().format(formatter));
        student.setUpdatedAt(LocalDateTime.now().format(formatter));
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            
            if (studentDetails.getName() != null) {
                student.setName(studentDetails.getName());
            }
            if (studentDetails.getEmail() != null) {
                student.setEmail(studentDetails.getEmail());
            }
            if (studentDetails.getPhone() != null) {
                student.setPhone(studentDetails.getPhone());
            }
            if (studentDetails.getCourse() != null) {
                student.setCourse(studentDetails.getCourse());
            }
            if (studentDetails.getGpa() != null) {
                student.setGpa(studentDetails.getGpa());
            }
            if (studentDetails.getAddress() != null) {
                student.setAddress(studentDetails.getAddress());
            }
            
            student.setUpdatedAt(LocalDateTime.now().format(formatter));
            return studentRepository.save(student);
        }
        
        throw new RuntimeException("Student not found with id: " + id);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    public Page<Student> searchStudents(String searchTerm, Pageable pageable) {
        return studentRepository.search(searchTerm, pageable);
    }

    public Page<Student> searchByName(String name, Pageable pageable) {
        return studentRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Student> searchByStudentId(String studentId, Pageable pageable) {
        return studentRepository.findByStudentIdContainingIgnoreCase(studentId, pageable);
    }
}
