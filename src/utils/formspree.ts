export interface NotificationPayload {
  candidateName: string;
  parishName: string;
  mentorName: string;
  mentorEmail: string;
  startedDate: string;
  completedLessonsCount?: number;
  message?: string;
}

export async function sendMentorNotification(
  endpoint: string,
  payload: NotificationPayload
): Promise<{ success: boolean; message: string }> {
  if (!endpoint || !endpoint.startsWith('http')) {
    return { success: false, message: 'Invalid Formspree endpoint URL provided.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: `[My First Confession] Preparation Started: ${payload.candidateName || 'New Candidate'} (${payload.parishName || 'Parish'})`,
        Candidate: payload.candidateName || 'Not specified',
        Parish: payload.parishName || 'Not specified',
        Sponsor_Mentor: payload.mentorName || 'Not specified',
        Mentor_Email: payload.mentorEmail || 'Not specified',
        Started_Date: payload.startedDate,
        Progress: `${payload.completedLessonsCount || 0} of 12 Lessons Completed`,
        Module: 'My First Confession — Sacramental Catechism',
        Note: payload.message || 'The family / candidate has begun the My First Confession preparation course.'
      })
    });

    if (response.ok) {
      return { success: true, message: 'Notification sent successfully to Father John / Parish catechist!' };
    } else {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        message: data.error || `Server responded with status ${response.status}. Progress is still saved on your device.`
      };
    }
  } catch (error: any) {
    console.error('Formspree notification error:', error);
    return {
      success: false,
      message: 'Network request could not be completed. Your progress remains saved locally on this device.'
    };
  }
}
