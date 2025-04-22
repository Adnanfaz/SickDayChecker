export const evaluateSymptoms = (symptoms, fluData) => {
    // Calculate severity score
    let severityScore = 0;
    
    // Assign weights to different symptoms
    if (symptoms.fever > 100.4) severityScore += 3;
    else if (symptoms.fever > 99.5) severityScore += 1;
    
    if (symptoms.cough === 'severe') severityScore += 3;
    else if (symptoms.cough === 'moderate') severityScore += 2;
    else if (symptoms.cough === 'mild') severityScore += 1;
    
    if (symptoms.soreThroat) severityScore += 1;
    if (symptoms.bodyAches) severityScore += 2;
    if (symptoms.headache) severityScore += 1;
    if (symptoms.fatigue === 'severe') severityScore += 3;
    else if (symptoms.fatigue === 'moderate') severityScore += 2;
    else if (symptoms.fatigue === 'mild') severityScore += 1;
    
    if (symptoms.shortnessOfBreath) severityScore += 4;
    if (symptoms.chestPain) severityScore += 4;
    
    // Consider local flu prevalence if available
    let localRiskFactor = 1.0;
    if (fluData) {
      if (fluData.activityLevel === 'high') localRiskFactor = 1.5;
      else if (fluData.activityLevel === 'very high') localRiskFactor = 2.0;
    }
    
    // Final adjusted score
    const finalScore = severityScore * localRiskFactor;
    
    // Determine recommendation
    if (finalScore >= 10 || symptoms.shortnessOfBreath || symptoms.chestPain) {
      return {
        recommendation: 'See a doctor',
        explanation: 'Your symptoms are severe and may require medical attention.',
        severity: 'high',
        score: finalScore
      };
    } else if (finalScore >= 5) {
      return {
        recommendation: 'Consider resting',
        explanation: 'Your symptoms suggest you should stay home and recover.',
        severity: 'medium',
        score: finalScore
      };
    } else {
      return {
        recommendation: 'Safe to go',
        explanation: 'Your symptoms are mild. Consider wearing a mask to protect others.',
        severity: 'low',
        score: finalScore
      };
    }
  };
  