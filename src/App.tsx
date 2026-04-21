import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import LessonPlan from "@/pages/LessonPlan";
import HomeworkGrade from "@/pages/HomeworkGrade";
import LearningAnalysis from "@/pages/LearningAnalysis";
import ClassroomInteraction from "@/pages/ClassroomInteraction";

export default function App() {
  return (
    <Router>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson-plan" element={<LessonPlan />} />
          <Route path="/homework-grade" element={<HomeworkGrade />} />
          <Route path="/learning-analysis" element={<LearningAnalysis />} />
          <Route path="/classroom-interaction" element={<ClassroomInteraction />} />
        </Routes>
      </div>
    </Router>
  );
}
