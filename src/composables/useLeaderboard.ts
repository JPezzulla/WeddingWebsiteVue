import { ref } from 'vue'
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase'

export interface LeaderboardEntry {
  id?: string
  name: string
  score: number
  timestamp: any
}

export function useLeaderboard() {
  const scores = ref<LeaderboardEntry[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const submitScore = async (name: string, score: number): Promise<boolean> => {
    try {
      loading.value = true
      error.value = null

      // Validate inputs
      if (!name.trim()) {
        error.value = 'Name is required'
        return false
      }

      if (score < 0) {
        error.value = 'Invalid score'
        return false
      }

      // Sanitize name (max 20 chars, no special chars)
      const sanitizedName = name
        .trim()
        .slice(0, 20)
        .replace(/[^\w\s-]/g, '')

      await addDoc(collection(db, 'snakeScores'), {
        name: sanitizedName,
        score: score,
        timestamp: serverTimestamp(),
      })

      // Refresh leaderboard
      await fetchTopScores()
      return true
    } catch (err) {
      console.error('Error submitting score:', err)
      error.value = 'Failed to submit score. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchTopScores = async (count = 10): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const q = query(collection(db, 'snakeScores'), orderBy('score', 'desc'), limit(count))

      const querySnapshot = await getDocs(q)

      scores.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LeaderboardEntry[]
    } catch (err) {
      console.error('Error fetching scores:', err)
      error.value = 'Failed to load leaderboard.'
    } finally {
      loading.value = false
    }
  }

  return {
    scores,
    loading,
    error,
    submitScore,
    fetchTopScores,
  }
}
