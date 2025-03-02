import { getUserOnboardingStatus } from '@/actions/user'
import { industries } from '@/app/data/industries'
import { redirect } from 'next/navigation';
import React from 'react'

const OnboardingPage = async() => {
  // Check if User is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if(isOnboarded){
    redirect("/dashboard")
  }

  return (
    <main>
      <OnboardingPage industries={industries} />
    </main>
  )
}

export default OnboardingPage