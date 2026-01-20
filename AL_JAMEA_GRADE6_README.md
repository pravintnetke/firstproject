# Al Jamea Grade 6 English Test - Implementation Guide

## Overview

The Al Jamea Grade 6 English Test Set 1 has been successfully implemented in the Linguaskill module format. This test is designed for Grade 6 students and covers two main sections: **Listening (40 marks)** and **Speaking (40 marks)**.

## Test Structure

### Section A: Listening (40 marks)

#### Part 1: Picture-based Multiple Choice (10 marks)
- **Questions**: 10 questions (Q1-Q10)
- **Type**: `listening_mcq_pictures`
- **Format**: Students listen to descriptions and choose the correct picture from 4 options (A, B, C, D)
- **Difficulty**: A2 level
- **Examples**:
  - Woman with striped purple dress walking a poodle
  - Boy flying a yellow diamond-shaped kite
  - Library scene with librarian and students
  - Beach scene with sandcastle building
  - Chef cooking in kitchen

#### Part 2: Gap Fill - Specific Details (10 marks)
- **Questions**: 10 questions (Q11-Q20)
- **Type**: `sentence_completion_typing`
- **Format**: Students listen and write one word/number/date/time
- **Difficulty**: A2-B1 level
- **Examples**:
  - School canteen closing time (2:30)
  - Favorite color (purple)
  - Project due date (March 15th)
  - Movie ticket cost (120 rupees)
  - Chapter number (7)

#### Part 3: Short Dialogues (5 marks)
- **Questions**: 5 questions (Q21-Q25)
- **Type**: `listening_mcq_sentences`
- **Format**: Students listen to short conversations and answer multiple choice questions
- **Difficulty**: B1 level
- **Examples**:
  - Meeting time for concert (5:15)
  - When notes need to be returned (Thursday)

#### Part 4: Extended Listening (15 marks)
- **Questions**: 15 questions (Q26-Q40)
- **Type**: `longer_listening_task`
- **Format**: Reasoning-based multiple choice questions from longer audio passages
- **Difficulty**: B1-B2 level

### Section B: Speaking (40 marks)

#### Part 1: Introduction - Personal Questions (10 marks)
- **Type**: `justify_opinion`
- **Time**: 5 minutes
- **Format**: Students answer personal questions in 2-3 sentences
- **Questions**:
  - What is your name and how old are you?
  - Where do you live?
  - What is your favorite subject in school and why?
  - How do you usually travel to school?
  - What meal do you enjoy cooking or eating most?

#### Part 2: Picture-based Description (15 marks)
- **Type**: `justify_opinion`
- **Time**: 5 minutes
- **Format**: Students describe a given picture covering:
  - What is happening in the picture
  - Who are the people and what are they doing
  - Setting or location
  - How people might be feeling

#### Part 3: Opinion Discussion (15 marks)
- **Type**: `discuss_statement`
- **Time**: 3 minutes
- **Topic**: "Reading books is better than watching movies"
- **Format**: Students discuss the statement, give their opinion, and provide examples

## Implementation Details

### Files Modified

1. **`src/data/linguaskillData.ts`**
   - Added `alJameaGrade6Questions` array with **43 complete questions**
   - Created `alJameaGrade6Test` configuration
   - Mapped all questions to appropriate Linguaskill question types

2. **`src/data/sampleData.ts`**
   - Added exam entry for Al Jamea Grade 6 test
   - Exam ID: `linguaskill_aljamea_grade6`
   - Duration: 80 minutes
   - Total marks: 80

3. **`src/pages/exam/ExamInterface.tsx`**
   - Updated to detect Al Jamea test by ID
   - Loads appropriate test session with Al Jamea questions
   - Filters questions by module (listening/speaking)

### Question Type Mapping

| Original Format | Linguaskill Type | Module | Count |
|----------------|------------------|---------|-------|
| Picture-based MCQ (Q1-10) | `listening_mcq_pictures` | Listening | 10 |
| Gap fill (Q11-20) | `sentence_completion_typing` | Listening | 10 |
| Short dialogue MCQ (Q21-25) | `listening_mcq_sentences` | Listening | 5 |
| Extended listening (Q26-40) | `longer_listening_task` | Listening | 15 |
| Personal questions | `justify_opinion` | Speaking | 1 |
| Picture description | `justify_opinion` | Speaking | 1 |
| Opinion discussion | `discuss_statement` | Speaking | 1 |
| **TOTAL** | | | **43** |

## How to Access

1. Navigate to the exam dashboard
2. Look for **"Al Jamea Grade 6 English Test Set 1"**
3. Click to start the test
4. Complete the pre-test procedures:
   - Accept terms and conditions
   - Select modules (Listening and Speaking)
   - Fill candidate information
   - Complete equipment checks
   - Read instructions
5. Take the test module by module

## Test Configuration

```typescript
{
  id: 'linguaskill_aljamea_grade6',
  title: 'Al Jamea Grade 6 English Test Set 1',
  modules: ['listening', 'speaking'],
  isAdaptive: false, // Grade-level test, not adaptive
  maxDuration: 80, // minutes
  totalMarks: 80,
  passingMarks: 40
}
```

## Features

### Listening Module
- ✅ Audio playback with 2-play limit
- ✅ Preparation time before each question
- ✅ Multiple question types (MCQ, gap-fill, extended listening)
- ✅ Visual feedback for answers
- ✅ Progress tracking

### Speaking Module
- ✅ Microphone recording capability
- ✅ Preparation time countdown
- ✅ Response time limits
- ✅ Recording playback for review
- ✅ Visual recording indicators

### General Features
- ✅ Proctoring enabled
- ✅ Timer management
- ✅ Module-specific navigation
- ✅ Progress indicators
- ✅ CEFR level alignment (A2-B2)

## Audio Files Required

The following audio files need to be placed in the `/public/audio/` directory:

### Listening Part 1 (Picture-based Q1-10)
- `aj_grade6_q1.mp3` through `aj_grade6_q10.mp3`

### Listening Part 2 (Gap fill Q11-20)
- `aj_grade6_q11.mp3` through `aj_grade6_q20.mp3`

### Listening Part 3 (Dialogues Q21-25)
- `aj_grade6_q21.mp3` through `aj_grade6_q25.mp3`

### Listening Part 4 (Extended Q26-40)
- `aj_grade6_q26.mp3` through `aj_grade6_q40.mp3`

**Total: 40 audio files for listening section**

## Scoring Guide

### Listening Section (40 marks)
- Part 1: 1 mark per question × 10 = 10 marks
- Part 2: 1 mark per question × 10 = 10 marks
- Part 3: 1 mark per question × 5 = 5 marks
- Part 4: 1 mark per question × 15 = 15 marks

### Speaking Section (40 marks)
- Part 1: 10 marks (fluency, vocabulary, accuracy)
- Part 2: 15 marks (description quality, coherence)
- Part 3: 15 marks (opinion clarity, examples, reasoning)

## Assessment Criteria

### Speaking Evaluation
Students are assessed on:
- **Fluency**: Smooth delivery without excessive pauses
- **Vocabulary**: Range and appropriateness of words used
- **Accuracy**: Grammatical correctness
- **Communication**: Ability to convey ideas clearly
- **Content**: Relevance and depth of responses

## CEFR Level Alignment

- **A2 (Elementary)**: Basic listening comprehension, simple personal questions
- **B1 (Intermediate)**: Understanding main points, expressing opinions with reasons
- **B2 (Upper Intermediate)**: Extended listening, complex opinion discussions

## Next Steps

### For Full Implementation
1. **Audio Recording**: Record all audio files with clear pronunciation
2. **Image Assets**: Create picture options for Part 1 questions
3. **Scoring System**: Implement automated scoring for objective questions
4. **Manual Grading**: Set up interface for teachers to grade speaking responses
5. **Results Dashboard**: Create detailed performance reports

### For Testing
1. Verify all questions load correctly
2. Test audio playback functionality
3. Check recording capabilities
4. Validate answer submission
5. Test proctoring features

## Support

For questions or issues related to this implementation, refer to:
- Main Linguaskill documentation: `LINGUASKILL_README.md`
- Type definitions: `src/types/linguaskill.ts`
- Sample data: `src/data/linguaskillData.ts`

## Version History

- **v1.0** (October 2025): Initial implementation with 18 questions covering Listening and Speaking modules
