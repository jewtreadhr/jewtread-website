// /**
//  * Jewtread HR - Main JavaScript Engine
//  * Dynamic State Management, Multi-criteria Job Filtering, Quick Apply Modal, and Dual Portal Logic
//  */

// document.addEventListener('DOMContentLoaded', () => {
    
//     // ==========================================
//     // 1. JewtreadStore - LocalStorage State Manager
//     // ==========================================
//     const JewtreadStore = {
//         getSavedJobs: () => {
//             try {
//                 return JSON.parse(localStorage.getItem('jewtread_saved_jobs')) || [];
//             } catch (e) {
//                 return [];
//             }
//         },

//         toggleSaveJob: (jobId) => {
//             let saved = JewtreadStore.getSavedJobs();
//             const index = saved.indexOf(jobId);
//             if (index > -1) {
//                 saved.splice(index, 1);
//             } else {
//                 saved.push(jobId);
//             }
//             localStorage.setItem('jewtread_saved_jobs', JSON.stringify(saved));
//             return saved.includes(jobId);
//         },

//         isJobSaved: (jobId) => {
//             return JewtreadStore.getSavedJobs().includes(jobId);
//         },

//         getApplications: () => {
//             try {
//                 const stored = JSON.parse(localStorage.getItem('jewtread_applications'));
//                 if (stored && stored.length > 0) return stored;
//             } catch (e) {}
            
//             // Seed initial application if empty
//             const initial = [{
//                 id: 'app-101',
//                 jobId: 'job-1',
//                 title: 'Executive Personal Assistant',
//                 company: 'Private Residence Placement',
//                 location: 'Lagos',
//                 appliedAt: 'Today',
//                 status: 'Submitted'
//             }];
//             localStorage.setItem('jewtread_applications', JSON.stringify(initial));
//             return initial;
//         },

//         addApplication: (appData) => {
//             const apps = JewtreadStore.getApplications();
//             const newApp = {
//                 id: 'app-' + Date.now(),
//                 jobId: appData.jobId || 'job-custom',
//                 title: appData.title || 'General Application',
//                 company: appData.company || 'Jewtread Client',
//                 location: appData.location || 'Lagos',
//                 appliedAt: 'Just now',
//                 status: 'Submitted',
//                 applicantName: appData.name,
//                 applicantEmail: appData.email
//             };
//             apps.unshift(newApp);
//             localStorage.setItem('jewtread_applications', JSON.stringify(apps));
//             return newApp;
//         },

//         getUserSession: () => {
//             try {
//                 return JSON.parse(localStorage.getItem('jewtread_session')) || { loggedIn: false, role: 'seeker' };
//             } catch (e) {
//                 return { loggedIn: false, role: 'seeker' };
//             }
//         },

//         setUserSession: (role, email) => {
//             const session = { loggedIn: true, role, email, loginTime: new Date().toISOString() };
//             localStorage.setItem('jewtread_session', JSON.stringify(session));
//             return session;
//         },

//         getEmployerJobs: () => {
//             try {
//                 const stored = JSON.parse(localStorage.getItem('jewtread_employer_jobs'));
//                 if (stored && stored.length > 0) return stored;
//             } catch (e) {}
            
//             const initialJobs = [
//                 { id: 'emp-1', title: 'Executive Personal Assistant', category: 'Domestic Staffing', location: 'Lagos', type: 'Full-time', applicants: 6, status: 'Active' },
//                 { id: 'emp-2', title: 'Operations Manager', category: 'Corporate Recruitment', location: 'Abuja', type: 'Full-time', applicants: 5, status: 'Active' },
//                 { id: 'emp-3', title: 'Household Chef', category: 'Domestic Staffing', location: 'Port Harcourt', type: 'Contract', applicants: 3, status: 'Active' }
//             ];
//             localStorage.setItem('jewtread_employer_jobs', JSON.stringify(initialJobs));
//             return initialJobs;
//         },

//         addEmployerJob: (job) => {
//             const jobs = JewtreadStore.getEmployerJobs();
//             const newJob = {
//                 id: 'emp-' + Date.now(),
//                 title: job.title,
//                 category: job.category,
//                 location: job.location,
//                 type: job.type,
//                 applicants: 0,
//                 status: 'Active'
//             };
//             jobs.unshift(newJob);
//             localStorage.setItem('jewtread_employer_jobs', JSON.stringify(jobs));
//             return newJob;
//         }
//     };

//     // Helper Toast Notification
//     function showToast(message) {
//         let toast = document.querySelector('.jewtread-toast');
//         if (!toast) {
//             toast = document.createElement('div');
//             toast.className = 'jewtread-toast';
//             document.body.appendChild(toast);
//         }
//         toast.textContent = message;
//         toast.classList.add('show');
//         setTimeout(() => {
//             toast.classList.remove('show');
//         }, 3000);
//     }

//     // ==========================================
//     // 2. Mobile Navigation Menu Toggle
//     // ==========================================
//     const menuToggle = document.getElementById('menu-toggle');
//     const navMenu = document.getElementById('nav-menu');

//     if (menuToggle && navMenu) {
//         menuToggle.addEventListener('click', () => {
//             const isActive = navMenu.classList.toggle('active');
//             menuToggle.classList.toggle('active');
//             menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
//             document.body.classList.toggle('nav-open', isActive);
//         });

//         document.addEventListener('click', (e) => {
//             if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
//                 navMenu.classList.remove('active');
//                 menuToggle.classList.remove('active');
//                 menuToggle.setAttribute('aria-expanded', 'false');
//                 document.body.classList.remove('nav-open');
//             }
//         });

//         navMenu.querySelectorAll('a').forEach(link => {
//             link.addEventListener('click', () => {
//                 navMenu.classList.remove('active');
//                 menuToggle.classList.remove('active');
//                 menuToggle.setAttribute('aria-expanded', 'false');
//                 document.body.classList.remove('nav-open');
//             });
//         });

//         // Keep the full-screen mobile menu predictable for keyboard users and
//         // reset it when a desktop viewport is restored.
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && navMenu.classList.contains('active')) {
//                 navMenu.classList.remove('active');
//                 menuToggle.classList.remove('active');
//                 menuToggle.setAttribute('aria-expanded', 'false');
//                 document.body.classList.remove('nav-open');
//                 menuToggle.focus();
//             }
//         });

//         window.addEventListener('resize', () => {
//             if (window.innerWidth > 768) {
//                 navMenu.classList.remove('active');
//                 menuToggle.classList.remove('active');
//                 menuToggle.setAttribute('aria-expanded', 'false');
//                 document.body.classList.remove('nav-open');
//             }
//         });
//     }

//     // ==========================================
//     // 3. Services Page Tabs System
//     // ==========================================
//     const serviceBlocks = document.querySelectorAll('.service-block');
//     const servicesNav = document.querySelector('.services-tabs');

//     if (serviceBlocks.length > 0 && servicesNav) {
//         const tabButtons = servicesNav.querySelectorAll('.tab-btn');

//         const switchTab = (targetId) => {
//             const targetBlock = document.getElementById(targetId);
//             if (!targetBlock) return;

//             serviceBlocks.forEach(block => {
//                 block.classList.remove('active');
//                 block.style.display = 'none';
//             });

//             targetBlock.style.display = 'block';
//             void targetBlock.offsetHeight;
//             targetBlock.classList.add('active');

//             tabButtons.forEach(btn => {
//                 if (btn.getAttribute('data-target') === targetId) {
//                     btn.classList.add('active');
//                     btn.setAttribute('aria-selected', 'true');
//                 } else {
//                     btn.classList.remove('active');
//                     btn.setAttribute('aria-selected', 'false');
//                 }
//             });

//             const rect = servicesNav.getBoundingClientRect();
//             if (rect.top < 0) {
//                 servicesNav.scrollIntoView({ behavior: 'smooth' });
//             }
//         };

//         tabButtons.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const targetId = btn.getAttribute('data-target');
//                 switchTab(targetId);
//                 history.pushState(null, null, `#${targetId}`);
//             });
//         });

//         const hash = window.location.hash.substring(1);
//         const validHashes = Array.from(serviceBlocks).map(block => block.id);
        
//         if (hash && validHashes.includes(hash)) {
//             switchTab(hash);
//         } else if (validHashes.length > 0) {
//             switchTab(validHashes[0]);
//         }

//         window.addEventListener('hashchange', () => {
//             const newHash = window.location.hash.substring(1);
//             if (newHash && validHashes.includes(newHash)) {
//                 switchTab(newHash);
//             }
//         });
//     }

//     // ==========================================
//     // 4. Contact Form Validation
//     // ==========================================
//     const contactForm = document.getElementById('custom-contact-form');
//     if (contactForm) {
//         const formFeedback = document.getElementById('form-feedback');
//         const submitBtn = document.getElementById('submit-btn');

//         const inputs = contactForm.querySelectorAll('input, textarea');
//         inputs.forEach(input => {
//             if (input.value.trim() !== '') {
//                 input.parentElement.classList.add('has-value');
//             }

//             input.addEventListener('focus', () => {
//                 input.parentElement.classList.add('is-focused');
//             });

//             input.addEventListener('blur', () => {
//                 input.parentElement.classList.remove('is-focused');
//                 if (input.value.trim() !== '') {
//                     input.parentElement.classList.add('has-value');
//                 } else {
//                     input.parentElement.classList.remove('has-value');
//                 }
//             });
//         });

//         contactForm.addEventListener('submit', (e) => {
//             e.preventDefault();
            
//             if (submitBtn) {
//                 submitBtn.disabled = true;
//                 const originalText = submitBtn.querySelector('.btn-text') ? submitBtn.querySelector('.btn-text').textContent : 'Submit';
//                 if (submitBtn.querySelector('.btn-text')) submitBtn.querySelector('.btn-text').textContent = 'Sending Enquiry...';
//             }

//             setTimeout(() => {
//                 if (formFeedback) {
//                     formFeedback.className = 'form-feedback success';
//                     formFeedback.innerHTML = `
//                         <div class="success-header">
//                             <span class="success-icon">✓</span>
//                             <strong>Enquiry Sent Successfully!</strong>
//                         </div>
//                         <p>Thank you. Our human capital specialists will review your enquiry and get back to you shortly.</p>
//                     `;
//                 }
//                 contactForm.reset();
//                 if (submitBtn) submitBtn.style.display = 'none';
//                 showToast('Enquiry sent successfully!');
//             }, 1200);
//         });
//     }

//     // ==========================================
//     // 5. Signup Page JS
//     // ==========================================

//     const togglePasswordBtn = document.getElementById('toggle-password');
//     const passwordInput = document.getElementById('reg-password');
//     const eyeShow = document.getElementById('eye-show');
//     const eyeHide = document.getElementById('eye-hide');

//     if (togglePasswordBtn && passwordInput) {
//         togglePasswordBtn.addEventListener('click', () => {
//             const isPassword = passwordInput.type === 'password';
//             passwordInput.type = isPassword ? 'text' : 'password';
//             if (eyeShow) eyeShow.style.display = isPassword ? 'none' : 'block';
//             if (eyeHide) eyeHide.style.display = isPassword ? 'block' : 'none';
//         });
//     }

//     // Native Django form submission will now handle signup securely.

//     // ==========================================
//     // 6. Login/Signup Mock Simulation (REMOVED)
//     // ==========================================
//     // Native Django form submission will now handle this securely.

//     // Login Notice helper
//     const loginNotice = document.getElementById('login-notice');
//     if (loginNotice && new URLSearchParams(window.location.search).get('next') === 'opportunities') {
//         loginNotice.hidden = false;
//         loginNotice.textContent = 'Sign in to browse opportunities and unlock your personalised job search.';
//     }

//     // ==========================================
//     // 7. Dynamic Job Search & Filter Engine
//     // ==========================================
//     const opportunityList = document.getElementById('opportunity-list');
//     const opportunitySearchForm = document.getElementById('opportunity-search');
//     const clearFiltersBtn = document.getElementById('clear-filters-btn');
//     const sortSelect = document.getElementById('sort-roles');
//     const resultsCountText = document.getElementById('results-count-text');
//     const resultsTitle = document.getElementById('results-title');

//     if (opportunityList) {
//         const roleCards = Array.from(opportunityList.querySelectorAll('.opportunity-card'));

//         const applyFilters = () => {
//             const keyword = (document.getElementById('opportunity-keyword')?.value || '').trim().toLowerCase();
//             const searchLocation = (document.getElementById('opportunity-location')?.value || '').trim().toLowerCase();
//             const searchType = document.getElementById('opportunity-type')?.value || '';

//             const selectedCategories = Array.from(document.querySelectorAll('input[name="filter-category"]:checked')).map(cb => cb.value.toLowerCase());
//             const selectedTypes = Array.from(document.querySelectorAll('input[name="filter-type"]:checked')).map(cb => cb.value.toLowerCase());
//             const selectedLocations = Array.from(document.querySelectorAll('input[name="filter-location"]:checked')).map(cb => cb.value.toLowerCase());

//             let visibleCount = 0;

//             roleCards.forEach(card => {
//                 const cardTitle = (card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '').toLowerCase();
//                 const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
//                 const cardLoc = (card.getAttribute('data-location') || '').toLowerCase();
//                 const cardType = (card.getAttribute('data-type') || '').toLowerCase();
//                 const cardDesc = (card.querySelector('.opportunity-description')?.textContent || '').toLowerCase();

//                 let matches = true;

//                 // Search inputs match
//                 if (keyword && !cardTitle.includes(keyword) && !cardDesc.includes(keyword) && !cardCat.includes(keyword)) matches = false;
//                 if (searchLocation && !cardLoc.includes(searchLocation)) matches = false;
//                 if (searchType && cardType !== searchType.toLowerCase()) matches = false;

//                 // Checkboxes match
//                 if (selectedCategories.length > 0 && !selectedCategories.includes(cardCat)) matches = false;
//                 if (selectedTypes.length > 0 && !selectedTypes.includes(cardType)) matches = false;
//                 if (selectedLocations.length > 0 && !selectedLocations.includes(cardLoc)) matches = false;

//                 if (matches) {
//                     card.style.display = 'flex';
//                     visibleCount++;
//                 } else {
//                     card.style.display = 'none';
//                 }
//             });

//             // Update UI count
//             if (resultsCountText) {
//                 resultsCountText.textContent = `${visibleCount} role${visibleCount === 1 ? '' : 's'} currently available`;
//             }

//             // Empty state container
//             let emptyState = opportunityList.querySelector('.no-results-state');
//             if (visibleCount === 0) {
//                 if (!emptyState) {
//                     emptyState = document.createElement('div');
//                     emptyState.className = 'no-results-state';
//                     emptyState.innerHTML = `
//                         <h3>No matching roles found</h3>
//                         <p>Try adjusting your search keywords or clearing some active filters.</p>
//                         <button type="button" class="btn btn-secondary" id="reset-no-results-btn">Reset All Filters</button>
//                     `;
//                     opportunityList.appendChild(emptyState);
//                     emptyState.querySelector('#reset-no-results-btn').addEventListener('click', resetFilters);
//                 }
//                 emptyState.style.display = 'block';
//             } else if (emptyState) {
//                 emptyState.style.display = 'none';
//             }
//         };

//         const resetFilters = () => {
//             if (opportunitySearchForm) opportunitySearchForm.reset();
//             document.querySelectorAll('aside.filter-panel input[type="checkbox"]').forEach(cb => cb.checked = false);
//             if (resultsTitle) resultsTitle.textContent = 'Recommended opportunities';
//             applyFilters();
//         };

//         // Event listeners for live filtering
//         document.querySelectorAll('aside.filter-panel input[type="checkbox"]').forEach(cb => {
//             cb.addEventListener('change', applyFilters);
//         });

//         if (opportunitySearchForm) {
//             opportunitySearchForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const kw = document.getElementById('opportunity-keyword')?.value.trim();
//                 if (resultsTitle && kw) {
//                     resultsTitle.textContent = `Roles matching “${kw}”`;
//                 }
//                 applyFilters();
//             });
//         }

//         if (clearFiltersBtn) {
//             clearFiltersBtn.addEventListener('click', resetFilters);
//         }

//         if (sortSelect) {
//             sortSelect.addEventListener('change', () => {
//                 const val = sortSelect.value;
//                 if (val === 'title') {
//                     roleCards.sort((a, b) => (a.getAttribute('data-title') || '').localeCompare(b.getAttribute('data-title') || ''));
//                 } else if (val === 'location') {
//                     roleCards.sort((a, b) => (a.getAttribute('data-location') || '').localeCompare(b.getAttribute('data-location') || ''));
//                 }
//                 roleCards.forEach(card => opportunityList.appendChild(card));
//             });
//         }

//         // Initialize state of Save buttons on opportunity page
//         const updateSaveButtons = () => {
//             document.querySelectorAll('.save-job').forEach(button => {
//                 const jobId = button.getAttribute('data-job-id');
//                 if (jobId && JewtreadStore.isJobSaved(jobId)) {
//                     button.classList.add('saved');
//                     button.textContent = 'Saved';
//                     button.setAttribute('aria-pressed', 'true');
//                 }
//             });
//         };
//         updateSaveButtons();

//         // Save Job click handler
//         document.querySelectorAll('.save-job').forEach(button => {
//             button.addEventListener('click', () => {
//                 const jobId = button.getAttribute('data-job-id') || 'job-' + Math.random().toString(36).substr(2, 5);
//                 button.setAttribute('data-job-id', jobId);
//                 const isSavedNow = JewtreadStore.toggleSaveJob(jobId);

//                 button.classList.toggle('saved', isSavedNow);
//                 button.textContent = isSavedNow ? 'Saved' : 'Save role';
//                 button.setAttribute('aria-pressed', isSavedNow ? 'true' : 'false');
//                 showToast(isSavedNow ? 'Role saved to your dashboard!' : 'Role removed from saved list.');
//             });
//         });
//     }

//     // ==========================================
//     // 8. Quick Apply Modal Handler
//     // ==========================================
//     const quickApplyModal = document.getElementById('quick-apply-modal');
//     const closeQuickApplyModal = document.getElementById('close-quick-apply-modal');
//     const quickApplyForm = document.getElementById('quick-apply-form');
//     const quickApplyRoleTitle = document.getElementById('quick-apply-role-title');
//     const quickApplyJobId = document.getElementById('quick-apply-job-id');
//     const dropzone = document.getElementById('qa-dropzone');
//     const fileInput = document.getElementById('qa-resume-file');
//     const filePreview = document.getElementById('qa-file-preview');

//     if (quickApplyModal) {
//         document.querySelectorAll('.quick-apply-btn').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const title = btn.getAttribute('data-job-title') || 'Vacancy';
//                 const jobId = btn.getAttribute('data-job-id') || 'job-custom';
//                 if (quickApplyRoleTitle) quickApplyRoleTitle.textContent = `Quick Apply for ${title}`;
//                 if (quickApplyJobId) quickApplyJobId.value = jobId;
//                 quickApplyModal.classList.add('is-open');
//             });
//         });

//         if (closeQuickApplyModal) {
//             closeQuickApplyModal.addEventListener('click', () => {
//                 quickApplyModal.classList.remove('is-open');
//             });
//         }

//         quickApplyModal.addEventListener('click', (e) => {
//             if (e.target === quickApplyModal) {
//                 quickApplyModal.classList.remove('is-open');
//             }
//         });

//         // Dropzone handlers
//         if (dropzone && fileInput) {
//             dropzone.addEventListener('click', () => fileInput.click());
//             dropzone.addEventListener('dragover', (e) => {
//                 e.preventDefault();
//                 dropzone.classList.add('is-dragover');
//             });
//             dropzone.addEventListener('dragleave', () => dropzone.classList.remove('is-dragover'));
//             dropzone.addEventListener('drop', (e) => {
//                 e.preventDefault();
//                 dropzone.classList.remove('is-dragover');
//                 if (e.dataTransfer.files.length > 0) {
//                     fileInput.files = e.dataTransfer.files;
//                     if (filePreview) filePreview.textContent = `Attached: ${e.dataTransfer.files[0].name}`;
//                 }
//             });

//             fileInput.addEventListener('change', () => {
//                 if (fileInput.files.length > 0 && filePreview) {
//                     filePreview.textContent = `Attached: ${fileInput.files[0].name}`;
//                 }
//             });
//         }

//         if (quickApplyForm) {
//             quickApplyForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const name = document.getElementById('qa-name')?.value;
//                 const email = document.getElementById('qa-email')?.value;
//                 const jobId = quickApplyJobId?.value;
//                 const title = quickApplyRoleTitle?.textContent.replace('Quick Apply for ', '');

//                 JewtreadStore.addApplication({
//                     jobId: jobId,
//                     title: title,
//                     name: name,
//                     email: email
//                 });

//                 quickApplyModal.classList.remove('is-open');
//                 quickApplyForm.reset();
//                 if (filePreview) filePreview.textContent = '';
//                 showToast('Application submitted successfully!');
//             });
//         }
//     }

//     // ==========================================
//     // 9. Employer Dashboard Interactivity
//     // ==========================================
//     const postJobModal = document.getElementById('post-job-modal');
//     const openPostJobBtn = document.getElementById('open-post-job-modal');
//     const closePostJobBtn = document.getElementById('close-post-job-modal');
//     const postJobForm = document.getElementById('post-job-form');
//     const employerJobsTableBody = document.getElementById('employer-jobs-table-body');
//     const kpiActiveJobs = document.getElementById('kpi-active-jobs');

//     if (employerJobsTableBody) {
//         const renderEmployerJobs = () => {
//             const jobs = JewtreadStore.getEmployerJobs();
//             if (kpiActiveJobs) kpiActiveJobs.textContent = jobs.length;

//             employerJobsTableBody.innerHTML = jobs.map(job => `
//                 <tr>
//                     <td><strong>${job.title}</strong></td>
//                     <td>${job.category}</td>
//                     <td>${job.location}</td>
//                     <td>${job.type}</td>
//                     <td>${job.applicants} applicant${job.applicants === 1 ? '' : 's'}</td>
//                     <td><span class="status-badge shortlisted">${job.status}</span></td>
//                     <td><button type="button" class="text-link" style="background:none; border:none; cursor:pointer;" onclick="alert('Viewing applicants for ${job.title}')">View Applicants</button></td>
//                 </tr>
//             `).join('');
//         };

//         renderEmployerJobs();

//         if (openPostJobBtn && postJobModal) {
//             openPostJobBtn.addEventListener('click', () => postJobModal.classList.add('is-open'));
//         }
//         if (closePostJobBtn && postJobModal) {
//             closePostJobBtn.addEventListener('click', () => postJobModal.classList.remove('is-open'));
//         }

//         if (postJobForm) {
//             postJobForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const title = document.getElementById('post-title')?.value;
//                 const category = document.getElementById('post-category')?.value;
//                 const location = document.getElementById('post-location')?.value;
//                 const type = document.getElementById('post-type')?.value;

//                 JewtreadStore.addEmployerJob({ title, category, location, type });
//                 renderEmployerJobs();
//                 postJobModal.classList.remove('is-open');
//                 postJobForm.reset();
//                 showToast('Vacancy published successfully!');
//             });
//         }
//     }

//     // ==========================================
//     // 10. Dynamic Job Seeker Dashboard & Applications Renderer
//     // ==========================================
//     const statApplicationsCount = document.getElementById('stat-applications-count');
//     const statSavedCount = document.getElementById('stat-saved-count');
//     const dashboardSavedRolesContainer = document.getElementById('dashboard-saved-roles-container');
//     const applicationsListContainer = document.getElementById('applications-list-container');

//     if (statApplicationsCount || statSavedCount || dashboardSavedRolesContainer) {
//         const savedIds = JewtreadStore.getSavedJobs();
//         const apps = JewtreadStore.getApplications();

//         if (statApplicationsCount) statApplicationsCount.textContent = apps.length;
//         if (statSavedCount) statSavedCount.textContent = savedIds.length;

//         if (dashboardSavedRolesContainer && savedIds.length > 0) {
//             const roleDataMap = {
//                 'job-1': { title: 'Executive Personal Assistant', meta: 'Private Residence Placement · Lagos', type: 'Full-time' },
//                 'job-2': { title: 'Operations Manager', meta: 'Corporate Talent Partner · Abuja', type: 'Full-time' },
//                 'job-3': { title: 'Household Chef', meta: 'Executive Household · Port Harcourt', type: 'Contract' },
//                 'job-4': { title: 'Customer Service Representative', meta: 'Business Services Team · Lagos', type: 'Full-time' }
//             };

//             dashboardSavedRolesContainer.innerHTML = savedIds.map(id => {
//                 const info = roleDataMap[id] || { title: 'Saved Role', meta: 'Jewtread HR Opportunity', type: 'Full-time' };
//                 return `
//                     <article class="dashboard-role">
//                         <div>
//                             <span class="role-type">${info.type}</span>
//                             <h3>${info.title}</h3>
//                             <p>${info.meta}</p>
//                         </div>
//                         <a href="/jobs/" class="btn btn-secondary">View Role</a>
//                     </article>
//                 `;
//             }).join('');
//         }
//     }

//     if (applicationsListContainer) {
//         const apps = JewtreadStore.getApplications();
//         const countSubmitted = document.getElementById('count-submitted');
//         if (countSubmitted) countSubmitted.textContent = apps.length;

//         if (apps.length > 0) {
//             applicationsListContainer.innerHTML = apps.map(app => `
//                 <article class="application-card" style="display:flex; justify-content:space-between; align-items:center; padding:18px; border:1px solid var(--border-color); border-radius:8px; margin-bottom:12px; background:var(--bg-white);">
//                     <div class="application-card-main">
//                         <span class="status-badge ${app.status === 'Submitted' ? 'under-review' : 'shortlisted'}" style="margin-bottom:6px;">${app.status}</span>
//                         <h3 style="font-size:1.15rem; margin-bottom:4px;">${app.title}</h3>
//                         <p style="margin-bottom:0; font-size:0.9rem; color:var(--text-muted);">${app.company || 'Jewtread HR'} · ${app.location || 'Nigeria'}</p>
//                         <span style="font-size:0.8rem; color:var(--text-muted);">Applied: ${app.appliedAt}</span>
//                     </div>
//                     <a href="/jobs/" class="text-link">View role &rarr;</a>
//                 </article>
//             `).join('');
//         }
//     }

//     // ==========================================
//     // 11. Profile Dropdown Handler
//     // ==========================================
//     const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
//     const profileDropdownMenu = document.getElementById('profile-dropdown-menu');

//     if (profileDropdownBtn && profileDropdownMenu) {
//         profileDropdownBtn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const isOpen = profileDropdownMenu.classList.toggle('show');
//             profileDropdownBtn.classList.toggle('active', isOpen);
//             profileDropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
//         });

//         document.addEventListener('click', (e) => {
//             if (!profileDropdownBtn.contains(e.target) && !profileDropdownMenu.contains(e.target)) {
//                 profileDropdownMenu.classList.remove('show');
//                 profileDropdownBtn.classList.remove('active');
//                 profileDropdownBtn.setAttribute('aria-expanded', 'false');
//             }
//         });
//     }

//     // ==========================================
//     // 12. Saved Jobs Page Renderer
//     // ==========================================
//     const savedJobsListContainer = document.getElementById('saved-jobs-list-container');
//     const savedCountSubtitle = document.getElementById('saved-count-subtitle');

//     if (savedJobsListContainer) {
//         const renderSavedJobsPage = () => {
//             const savedIds = JewtreadStore.getSavedJobs();
//             if (savedCountSubtitle) {
//                 savedCountSubtitle.textContent = `You have ${savedIds.length} bookmarked role${savedIds.length === 1 ? '' : 's'}.`;
//             }

//             if (savedIds.length === 0) {
//                 savedJobsListContainer.innerHTML = `
//                     <div class="no-results-state">
//                         <h3>No Saved Jobs Yet</h3>
//                         <p>You haven't bookmarked any opportunities. Explore roles to save job openings you are interested in.</p>
//                         <a href="/jobs/" class="btn btn-primary">Browse Opportunities</a>
//                     </div>
//                 `;
//                 return;
//             }

//             const roleDataMap = {
//                 'job-1': { title: 'Executive Personal Assistant', employer: 'Private Residence Placement', location: 'Lagos', category: 'Domestic staffing', type: 'Full-time', desc: 'Support an executive household with diary management, correspondence, errands, and day-to-day coordination.' },
//                 'job-2': { title: 'Operations Manager', employer: 'Corporate Talent Partner', location: 'Abuja', category: 'Corporate recruitment', type: 'Full-time', desc: 'Lead daily operations, coordinate teams, and help deliver efficient service across a growing organisation.' },
//                 'job-3': { title: 'Household Chef', employer: 'Executive Household', location: 'Port Harcourt', category: 'Domestic staffing', type: 'Contract', desc: 'Prepare healthy, varied meals for a private residence while maintaining an organised, professional kitchen.' },
//                 'job-4': { title: 'Customer Service Representative', employer: 'Business Services Team', location: 'Lagos', category: 'Corporate recruitment', type: 'Full-time', desc: 'Provide helpful, accurate support to customers and contribute to a consistent service experience.' }
//             };

//             savedJobsListContainer.innerHTML = savedIds.map(id => {
//                 const role = roleDataMap[id] || { title: 'Saved Opportunity', employer: 'Jewtread Client', location: 'Nigeria', category: 'General staffing', type: 'Full-time', desc: 'Review job specifications and submit your application.' };
//                 return `
//                     <article class="opportunity-card" style="display:flex;">
//                         <div class="opportunity-card-main">
//                             <span class="role-type">${role.type}</span>
//                             <h3>${role.title}</h3>
//                             <p class="opportunity-employer">${role.employer}</p>
//                             <div class="opportunity-meta">
//                                 <span>${role.location}</span>
//                                 <span>${role.category}</span>
//                             </div>
//                             <p class="opportunity-description">${role.desc}</p>
//                         </div>
//                         <div class="opportunity-card-actions">
//                             <button class="save-job saved" type="button" data-job-id="${id}">Saved</button>
//                             <button class="btn btn-secondary quick-apply-btn" type="button" data-job-id="${id}" data-job-title="${role.title}">Quick Apply</button>
//                             <a href="/jobs/" class="btn btn-primary">View role</a>
//                         </div>
//                     </article>
//                 `;
//             }).join('');

//             // Re-bind click handlers for unsaving directly on saved-jobs.html
//             savedJobsListContainer.querySelectorAll('.save-job').forEach(btn => {
//                 btn.addEventListener('click', () => {
//                     const jobId = btn.getAttribute('data-job-id');
//                     JewtreadStore.toggleSaveJob(jobId);
//                     showToast('Role removed from saved list.');
//                     renderSavedJobsPage();
//                 });
//             });

//             // Re-bind Quick Apply modal triggers on saved-jobs.html
//             savedJobsListContainer.querySelectorAll('.quick-apply-btn').forEach(btn => {
//                 btn.addEventListener('click', () => {
//                     const title = btn.getAttribute('data-job-title') || 'Vacancy';
//                     const jobId = btn.getAttribute('data-job-id') || 'job-custom';
//                     const qaTitle = document.getElementById('quick-apply-role-title');
//                     const qaJobId = document.getElementById('quick-apply-job-id');
//                     const qaModal = document.getElementById('quick-apply-modal');
//                     if (qaTitle) qaTitle.textContent = `Quick Apply for ${title}`;
//                     if (qaJobId) qaJobId.value = jobId;
//                     if (qaModal) qaModal.classList.add('is-open');
//                 });
//             });
//         };

//         renderSavedJobsPage();
//     }

//     // ==========================================
//     // 13. Profile & CV Page Handlers
//     // ==========================================
//     const profilePersonalForm = document.getElementById('profile-personal-form');
//     const profileCvDropzone = document.getElementById('profile-cv-dropzone');
//     const profileCvFile = document.getElementById('profile-cv-file');
//     const cvAttachedCard = document.getElementById('cv-attached-card');
//     const cvFileName = document.getElementById('cv-file-name');
//     const removeCvBtn = document.getElementById('remove-cv-btn');
//     const addSkillForm = document.getElementById('add-skill-form');
//     const newSkillInput = document.getElementById('new-skill-input');
//     const skillsChipContainer = document.getElementById('skills-chip-container');

//     if (profilePersonalForm) {
//         profilePersonalForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const fullName = document.getElementById('prof-fullname')?.value;
//             const headline = document.getElementById('prof-headline')?.value;
//             const sidebarName = document.getElementById('sidebar-candidate-name');
//             const sidebarTitle = document.getElementById('sidebar-candidate-title');

//             if (sidebarName && fullName) sidebarName.textContent = fullName;
//             if (sidebarTitle && headline) sidebarTitle.textContent = headline;

//             showToast('Personal information updated successfully!');
//         });
//     }

//     if (profileCvDropzone && profileCvFile) {
//         profileCvDropzone.addEventListener('click', () => profileCvFile.click());
//         profileCvFile.addEventListener('change', () => {
//             if (profileCvFile.files.length > 0) {
//                 const name = profileCvFile.files[0].name;
//                 if (cvFileName) cvFileName.textContent = name;
//                 if (cvAttachedCard) cvAttachedCard.hidden = false;
//                 showToast('New CV document attached!');
//             }
//         });
//     }

//     if (removeCvBtn && cvAttachedCard) {
//         removeCvBtn.addEventListener('click', () => {
//             cvAttachedCard.hidden = true;
//             if (profileCvFile) profileCvFile.value = '';
//             showToast('CV document removed.');
//         });
//     }

//     const directCvUploadForm = document.getElementById('direct-cv-upload-form');
//     const directCvFeedback = document.getElementById('direct-cv-feedback');

//     if (directCvUploadForm) {
//         directCvUploadForm.addEventListener('submit', (e) => {
//             e.preventDefault();

//             if (directCvFeedback) {
//                 directCvFeedback.className = 'form-feedback success';
//                 directCvFeedback.innerHTML = `
//                     <div class="success-header">
//                         <span class="success-icon">&#10003;</span>
//                         <strong>CV uploaded successfully.</strong>
//                     </div>
//                     <p>Thanks. Our team will review your details and contact you if there's a good match.</p>
//                 `;
//             }

//             showToast('CV uploaded successfully!');
//             directCvUploadForm.reset();
//             if (cvAttachedCard) cvAttachedCard.hidden = true;
//         });
//     }

//     if (profileCvDropzone && profileCvFile) {
//         profileCvDropzone.addEventListener('keydown', (e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//                 e.preventDefault();
//                 profileCvFile.click();
//             }
//         });
//     }

//     if (addSkillForm && newSkillInput && skillsChipContainer) {
//         addSkillForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const val = newSkillInput.value.trim();
//             if (val) {
//                 const chip = document.createElement('span');
//                 chip.style.cssText = 'background-color: var(--bg-light); border: 1px solid var(--border-color); padding: 6px 14px; border-radius: 20px; font-size: 0.88rem; font-weight: 500;';
//                 chip.textContent = val;
//                 skillsChipContainer.appendChild(chip);
//                 newSkillInput.value = '';
//                 showToast(`Added skill "${val}"`);
//             }
//         });
//     }

//     // ==========================================
//     // 14. Job Alerts & Account Forms
//     // ==========================================
//     const createAlertForm = document.getElementById('create-alert-form');
//     const activeAlertsContainer = document.getElementById('active-alerts-container');

//     if (createAlertForm && activeAlertsContainer) {
//         createAlertForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const title = document.getElementById('alert-title')?.value;
//             const cat = document.getElementById('alert-category')?.value;
//             const loc = document.getElementById('alert-location')?.value;

//             const card = document.createElement('div');
//             card.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 12px; background-color: var(--bg-warm);';
//             card.innerHTML = `
//                 <div>
//                     <strong style="display: block; font-size: 0.98rem;">${title}</strong>
//                     <small style="color: var(--text-muted);">${cat} · ${loc} · Instant email alert</small>
//                 </div>
//                 <button type="button" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;" onclick="this.closest('div').remove(); showToast('Alert rule deleted.');">Delete</button>
//             `;
//             activeAlertsContainer.prepend(card);
//             createAlertForm.reset();
//             showToast('Job alert rule saved!');
//         });
//     }

//     const changePasswordForm = document.getElementById('change-password-form');
//     if (changePasswordForm) {
//         changePasswordForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const pass1 = document.getElementById('new-pass')?.value;
//             const pass2 = document.getElementById('confirm-new-pass')?.value;
//             if (pass1 !== pass2) {
//                 alert('New passwords do not match!');
//                 return;
//             }
//             changePasswordForm.reset();
//             showToast('Password updated successfully!');
//         });
//     }

//     const commPrefsForm = document.getElementById('comm-prefs-form');
//     if (commPrefsForm) {
//         commPrefsForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             showToast('Communication preferences saved!');
//         });
//     }

//     const privacySettingsForm = document.getElementById('privacy-settings-form');
//     if (privacySettingsForm) {
//         privacySettingsForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             showToast('Privacy visibility settings saved!');
//         });
//     }

//     const placementPrefsForm = document.getElementById('placement-prefs-form');
//     if (placementPrefsForm) {
//         placementPrefsForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             showToast('Placement and compensation criteria saved!');
//         });
//     }

//     // Account Settings Tab Switcher
//     const accountTabBtns = document.querySelectorAll('.account-tab-btn');
//     const accountSections = document.querySelectorAll('.account-settings-section');

//     if (accountTabBtns.length > 0 && accountSections.length > 0) {
//         const switchAccountTab = (targetId) => {
//             accountSections.forEach(sec => {
//                 sec.style.display = 'none';
//                 sec.classList.remove('active');
//             });

//             const targetSec = document.getElementById(targetId);
//             if (targetSec) {
//                 targetSec.style.display = 'block';
//                 targetSec.classList.add('active');
//             }

//             accountTabBtns.forEach(btn => {
//                 const isMatch = btn.getAttribute('data-target') === targetId;
//                 btn.classList.toggle('active', isMatch);
//                 if (isMatch) {
//                     btn.style.backgroundColor = 'var(--bg-light)';
//                     btn.style.borderLeft = '3px solid var(--cta-emerald)';
//                     btn.style.color = 'var(--primary-forest)';
//                     btn.style.fontWeight = '600';
//                 } else {
//                     btn.style.backgroundColor = 'transparent';
//                     btn.style.borderLeft = '3px solid transparent';
//                     btn.style.color = btn.getAttribute('data-target') === 'sec-danger' ? '#C53030' : 'var(--text-charcoal)';
//                     btn.style.fontWeight = '500';
//                 }
//             });
//         };

//         accountTabBtns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const targetId = btn.getAttribute('data-target');
//                 switchAccountTab(targetId);
//             });
//         });

//         // Default to first section
//         switchAccountTab('sec-password');
//     }

//     // ==========================================
//     // 15. Hire a Professional Form & Dynamic Suggestions
//     // ==========================================
//     const hireForm = document.getElementById('hire-professional-form');
//     const roleSuggestionsContainer = document.getElementById('role-suggestions');
//     const roleInput = document.getElementById('roleNeeded');
//     const hireFeedback = document.getElementById('hire-form-feedback');
//     const hireSubmitBtn = document.getElementById('hire-submit-btn');
//     const categoryRadios = document.querySelectorAll('input[name="staffCategory"]');

//     const rolePresets = {
//         'Domestic Staffing': [
//             { label: 'Household Chef', role: 'Household Cook / Chef' },
//             { label: 'Nanny', role: 'Nanny / Governess' },
//             { label: 'Chauffeur', role: 'Professional Chauffeur / Driver' },
//             { label: 'Housekeeper', role: 'Experienced Housekeeper / Cleaner' },
//             { label: 'Caregiver', role: 'Elderly Caregiver / Companion' },
//             { label: 'Estate Manager', role: 'Estate Supervisor / Facility Manager' }
//         ],
//         'Corporate Recruitment': [
//             { label: 'Executive PA', role: 'Executive Personal Assistant' },
//             { label: 'Operations Manager', role: 'Operations & Logistics Manager' },
//             { label: 'Finance / Accountant', role: 'Accountant / Financial Officer' },
//             { label: 'HR Officer', role: 'Human Resources & Recruitment Officer' },
//             { label: 'Sales & Marketing', role: 'Sales & Business Development Lead' },
//             { label: 'Front Desk', role: 'Front Desk & Administrative Support' }
//         ],
//         'Workforce Outsourcing': [
//             { label: 'Shift Support', role: 'Shift Operations Support' },
//             { label: 'Cleaning Crew', role: 'Facility Cleaners & Janitorial Staff' },
//             { label: 'Security Team', role: 'Contracted Security Personnel' },
//             { label: 'Logistics / Drivers', role: 'Logistics Drivers & Fleet Staff' },
//             { label: 'Hospitality Staff', role: 'Hospitality & Event Crew' },
//             { label: 'Warehouse Team', role: 'Warehouse & Inventory Assistants' }
//         ]
//     };

//     function updateRoleSuggestions(category) {
//         if (!roleSuggestionsContainer) return;
//         const suggestions = rolePresets[category] || rolePresets['Domestic Staffing'];
//         roleSuggestionsContainer.innerHTML = '';
//         suggestions.forEach(item => {
//             const btn = document.createElement('button');
//             btn.type = 'button';
//             btn.className = 'suggestion-chip';
//             btn.setAttribute('data-role', item.role);
//             btn.textContent = item.label;
//             roleSuggestionsContainer.appendChild(btn);
//         });
//         bindSuggestionChips();
//     }

//     function bindSuggestionChips() {
//         const chips = document.querySelectorAll('.suggestion-chip');
//         chips.forEach(chip => {
//             chip.addEventListener('click', () => {
//                 const roleValue = chip.getAttribute('data-role');
//                 if (roleInput && roleValue) {
//                     roleInput.value = roleValue;
//                     roleInput.focus();
//                     chips.forEach(c => c.classList.remove('active'));
//                     chip.classList.add('active');
//                 }
//             });
//         });
//     }

//     if (categoryRadios.length > 0) {
//         categoryRadios.forEach(radio => {
//             radio.addEventListener('change', (e) => {
//                 if (e.target.checked) {
//                     updateRoleSuggestions(e.target.value);
//                 }
//             });
//         });
//     }

//     bindSuggestionChips();

//     // if (hireForm) {
//     //     hireForm.addEventListener('submit', (e) => {
//     //         e.preventDefault();

//     //         const role = document.getElementById('roleNeeded')?.value.trim();
//     //         const clientName = document.getElementById('clientName')?.value.trim();
//     //         const clientEmail = document.getElementById('clientEmail')?.value.trim();
//     //         const clientPhone = document.getElementById('clientPhone')?.value.trim();
//     //         const location = document.getElementById('placementLocation')?.value;
//     //         const timeline = document.getElementById('targetStartDate')?.value;
//     //         const arrangement = document.getElementById('workArrangement')?.value;
//     //         const numHires = document.getElementById('numHires')?.value;
//     //         const orgName = document.getElementById('organizationName')?.value.trim();
//     //         const details = document.getElementById('roleDetails')?.value.trim();
//     //         const selectedCat = document.querySelector('input[name="staffCategory"]:checked')?.value || 'Domestic Staffing';

//     //         if (!role || !clientName || !clientEmail || !clientPhone || !location || !timeline || !arrangement || !numHires) {
//     //             if (hireFeedback) {
//     //                 hireFeedback.className = 'form-feedback error';
//     //                 hireFeedback.innerHTML = '<strong>Please complete all required fields (*).</strong>';
//     //             }
//     //             return;
//     //         }

//     //         if (hireSubmitBtn) {
//     //             hireSubmitBtn.disabled = true;
//     //             const btnTextEl = hireSubmitBtn.querySelector('.btn-text');
//     //             if (btnTextEl) btnTextEl.textContent = 'Processing Staffing Request...';
//     //         }

//     //         setTimeout(() => {
//     //             // Store staffing request in localStorage
//     //             try {
//     //                 const requests = JSON.parse(localStorage.getItem('jewtread_hiring_requests')) || [];
//     //                 const newRequest = {
//     //                     id: 'req-' + Date.now(),
//     //                     category: selectedCat,
//     //                     role,
//     //                     numHires,
//     //                     arrangement,
//     //                     location,
//     //                     timeline,
//     //                     clientName,
//     //                     orgName: orgName || 'Private Household',
//     //                     clientEmail,
//     //                     clientPhone,
//     //                     details,
//     //                     submittedAt: new Date().toISOString()
//     //                 };
//     //                 requests.unshift(newRequest);
//     //                 localStorage.setItem('jewtread_hiring_requests', JSON.stringify(requests));
//     //             } catch (err) {}

//     //             if (hireFeedback) {
//     //                 hireFeedback.className = 'form-feedback success';
//     //                 hireFeedback.innerHTML = `
//     //                     <div class="success-header">
//     //                         <span class="success-icon">&#10003;</span>
//     //                         <strong>Staffing Request Received!</strong>
//     //                     </div>
//     //                     <p>Thank you, <strong>${clientName}</strong>. We have logged your request for <strong>${role} (${selectedCat})</strong> in <strong>${location}</strong>.</p>
//     //                     <p style="margin-top: 8px; font-size: 0.92rem;">A senior Jewtread HR placement specialist will review your requirements and reach out at <strong>${clientPhone}</strong> / <strong>${clientEmail}</strong> within 24 hours.</p>
//     //                 `;
//     //             }

//     //             hireForm.reset();
//     //             if (hireSubmitBtn) {
//     //                 hireSubmitBtn.disabled = false;
//     //                 const btnTextEl = hireSubmitBtn.querySelector('.btn-text');
//     //                 if (btnTextEl) btnTextEl.textContent = 'Submit Staffing Request';
//     //             }

//     //             showToast('Staffing request submitted successfully!');
//     //             hireFeedback?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     //         }, 1200);
//     //     });
//     // }

//     // ==========================================
//     // 16. Services Page Interactive Tabs & Deep Links
//     // ==========================================
//     const serviceTabBtnsV2 = document.querySelectorAll('.services-tabs .tab-btn');
//     const serviceBlocksV2 = document.querySelectorAll('.services-detail-section .service-block');

//     function activateServiceTab(targetId) {
//         if (!targetId || serviceBlocksV2.length === 0) return;

//         serviceBlocksV2.forEach(block => {
//             block.classList.remove('active');
//             if (block.id === targetId) {
//                 block.classList.add('active');
//             }
//         });

//         serviceTabBtnsV2.forEach(btn => {
//             const isMatch = btn.getAttribute('data-target') === targetId;
//             btn.classList.toggle('active', isMatch);
//             btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
//         });
//     }

//     if (serviceTabBtnsV2.length > 0) {
//         serviceTabBtnsV2.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 const target = btn.getAttribute('data-target');
//                 activateServiceTab(target);
//             });
//         });

//         // Check hash link on page load (e.g. #domestic, #corporate, #management)
//         const initialHash = window.location.hash.replace('#', '');
//         if (initialHash && ['domestic', 'corporate', 'management'].includes(initialHash)) {
//             activateServiceTab(initialHash);
//             const targetEl = document.getElementById(initialHash);
//             if (targetEl) {
//                 setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 200);
//             }
//         }

//         // Service directory cards anchor click handling
//         document.querySelectorAll('.service-directory-card[href^="#"]').forEach(card => {
//             card.addEventListener('click', (e) => {
//                 const href = card.getAttribute('href');
//                 const targetId = href.replace('#', '');
//                 if (targetId && ['domestic', 'corporate', 'management'].includes(targetId)) {
//                     activateServiceTab(targetId);
//                 }
//             });
//         });
//     }
// });

document.addEventListener('DOMContentLoaded', () => {

    const JewtreadStore = {
        getSavedJobs: () => {
            try {
                return JSON.parse(localStorage.getItem('jewtread_saved_jobs')) || [];
            } catch (e) {
                return [];
            }
        },

        toggleSaveJob: (jobId) => {
            let saved = JewtreadStore.getSavedJobs();
            const index = saved.indexOf(jobId);
            if (index > -1) {
                saved.splice(index, 1);
            } else {
                saved.push(jobId);
            }
            localStorage.setItem('jewtread_saved_jobs', JSON.stringify(saved));
            return saved.includes(jobId);
        },

        isJobSaved: (jobId) => {
            return JewtreadStore.getSavedJobs().includes(jobId);
        },

        getApplications: () => {
            try {
                const stored = JSON.parse(localStorage.getItem('jewtread_applications'));
                if (stored && stored.length > 0) return stored;
            } catch (e) {}
            
            // Seed initial application if empty
            const initial = [{
                id: 'app-101',
                jobId: 'job-1',
                title: 'Executive Personal Assistant',
                company: 'Private Residence Placement',
                location: 'Lagos',
                appliedAt: 'Today',
                status: 'Submitted'
            }];
            localStorage.setItem('jewtread_applications', JSON.stringify(initial));
            return initial;
        },

        addApplication: (appData) => {
            const apps = JewtreadStore.getApplications();
            const newApp = {
                id: 'app-' + Date.now(),
                jobId: appData.jobId || 'job-custom',
                title: appData.title || 'General Application',
                company: appData.company || 'Jewtread Client',
                location: appData.location || 'Lagos',
                appliedAt: 'Just now',
                status: 'Submitted',
                applicantName: appData.name,
                applicantEmail: appData.email
            };
            apps.unshift(newApp);
            localStorage.setItem('jewtread_applications', JSON.stringify(apps));
            return newApp;
        },

        getUserSession: () => {
            try {
                return JSON.parse(localStorage.getItem('jewtread_session')) || { loggedIn: false, role: 'seeker' };
            } catch (e) {
                return { loggedIn: false, role: 'seeker' };
            }
        },

        setUserSession: (role, email) => {
            const session = { loggedIn: true, role, email, loginTime: new Date().toISOString() };
            localStorage.setItem('jewtread_session', JSON.stringify(session));
            return session;
        },

        getEmployerJobs: () => {
            try {
                const stored = JSON.parse(localStorage.getItem('jewtread_employer_jobs'));
                if (stored && stored.length > 0) return stored;
            } catch (e) {}
            
            const initialJobs = [
                { id: 'emp-1', title: 'Executive Personal Assistant', category: 'Domestic Staffing', location: 'Lagos', type: 'Full-time', applicants: 6, status: 'Active' },
                { id: 'emp-2', title: 'Operations Manager', category: 'Corporate Recruitment', location: 'Abuja', type: 'Full-time', applicants: 5, status: 'Active' },
                { id: 'emp-3', title: 'Household Chef', category: 'Domestic Staffing', location: 'Port Harcourt', type: 'Contract', applicants: 3, status: 'Active' }
            ];
            localStorage.setItem('jewtread_employer_jobs', JSON.stringify(initialJobs));
            return initialJobs;
        },

        addEmployerJob: (job) => {
            const jobs = JewtreadStore.getEmployerJobs();
            const newJob = {
                id: 'emp-' + Date.now(),
                title: job.title,
                category: job.category,
                location: job.location,
                type: job.type,
                applicants: 0,
                status: 'Active'
            };
            jobs.unshift(newJob);
            localStorage.setItem('jewtread_employer_jobs', JSON.stringify(jobs));
            return newJob;
        }
    };

    // Helper Toast Notification
    function showToast(message) {
        let toast = document.querySelector('.jewtread-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'jewtread-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ==========================================
    // 2. Mobile Navigation Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.classList.toggle('nav-open', isActive);
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });

        // Keep the full-screen mobile menu predictable for keyboard users and
        // reset it when a desktop viewport is restored.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
                menuToggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // ==========================================
    // 3. Services Page Tabs System
    // ==========================================
    const serviceBlocks = document.querySelectorAll('.service-block');
    const servicesNav = document.querySelector('.services-tabs');

    if (serviceBlocks.length > 0 && servicesNav) {
        const tabButtons = servicesNav.querySelectorAll('.tab-btn');

        const switchTab = (targetId) => {
            const targetBlock = document.getElementById(targetId);
            if (!targetBlock) return;

            serviceBlocks.forEach(block => {
                block.classList.remove('active');
                block.style.display = 'none';
            });

            targetBlock.style.display = 'block';
            void targetBlock.offsetHeight;
            targetBlock.classList.add('active');

            tabButtons.forEach(btn => {
                if (btn.getAttribute('data-target') === targetId) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                }
            });

            const rect = servicesNav.getBoundingClientRect();
            if (rect.top < 0) {
                servicesNav.scrollIntoView({ behavior: 'smooth' });
            }
        };

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                switchTab(targetId);
                history.pushState(null, null, `#${targetId}`);
            });
        });

        const hash = window.location.hash.substring(1);
        const validHashes = Array.from(serviceBlocks).map(block => block.id);
        
        if (hash && validHashes.includes(hash)) {
            switchTab(hash);
        } else if (validHashes.length > 0) {
            switchTab(validHashes[0]);
        }

        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.substring(1);
            if (newHash && validHashes.includes(newHash)) {
                switchTab(newHash);
            }
        });
    }

    // ==========================================
    // 4. Contact Form
    // ==========================================
    // Fake e.preventDefault() + setTimeout mock submission removed.
    // core:contact now has a real Django view -- native form POST handles this.
    // Kept: purely cosmetic focus/blur/has-value label styling (no submission logic).
    const contactForm = document.getElementById('custom-contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('has-value');
            }

            input.addEventListener('focus', () => {
                input.parentElement.classList.add('is-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('is-focused');
                if (input.value.trim() !== '') {
                    input.parentElement.classList.add('has-value');
                } else {
                    input.parentElement.classList.remove('has-value');
                }
            });
        });
    }

    // ==========================================
    // 5. Signup Page JS
    // ==========================================

    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('reg-password');
    const eyeShow = document.getElementById('eye-show');
    const eyeHide = document.getElementById('eye-hide');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            if (eyeShow) eyeShow.style.display = isPassword ? 'none' : 'block';
            if (eyeHide) eyeHide.style.display = isPassword ? 'block' : 'none';
        });
    }

    // Native Django form submission will now handle signup securely.

    // ==========================================
    // 6. Login/Signup Mock Simulation (REMOVED)
    // ==========================================
    // Native Django form submission will now handle this securely.

    // Login Notice helper
    const loginNotice = document.getElementById('login-notice');
    if (loginNotice && new URLSearchParams(window.location.search).get('next') === 'opportunities') {
        loginNotice.hidden = false;
        loginNotice.textContent = 'Sign in to browse opportunities and unlock your personalised job search.';
    }

    // ==========================================
    // 7. Dynamic Job Search & Filter Engine  [PROTOTYPE - localStorage only]
    // ==========================================
    const opportunityList = document.getElementById('opportunity-list');
    const opportunitySearchForm = document.getElementById('opportunity-search');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const sortSelect = document.getElementById('sort-roles');
    const resultsCountText = document.getElementById('results-count-text');
    const resultsTitle = document.getElementById('results-title');

    if (opportunityList) {
        const roleCards = Array.from(opportunityList.querySelectorAll('.opportunity-card'));

        const applyFilters = () => {
            const keyword = (document.getElementById('opportunity-keyword')?.value || '').trim().toLowerCase();
            const searchLocation = (document.getElementById('opportunity-location')?.value || '').trim().toLowerCase();
            const searchType = document.getElementById('opportunity-type')?.value || '';

            const selectedCategories = Array.from(document.querySelectorAll('input[name="filter-category"]:checked')).map(cb => cb.value.toLowerCase());
            const selectedTypes = Array.from(document.querySelectorAll('input[name="filter-type"]:checked')).map(cb => cb.value.toLowerCase());
            const selectedLocations = Array.from(document.querySelectorAll('input[name="filter-location"]:checked')).map(cb => cb.value.toLowerCase());

            let visibleCount = 0;

            roleCards.forEach(card => {
                const cardTitle = (card.getAttribute('data-title') || card.querySelector('h3')?.textContent || '').toLowerCase();
                const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
                const cardLoc = (card.getAttribute('data-location') || '').toLowerCase();
                const cardType = (card.getAttribute('data-type') || '').toLowerCase();
                const cardDesc = (card.querySelector('.opportunity-description')?.textContent || '').toLowerCase();

                let matches = true;

                if (keyword && !cardTitle.includes(keyword) && !cardDesc.includes(keyword) && !cardCat.includes(keyword)) matches = false;
                if (searchLocation && !cardLoc.includes(searchLocation)) matches = false;
                if (searchType && cardType !== searchType.toLowerCase()) matches = false;

                if (selectedCategories.length > 0 && !selectedCategories.includes(cardCat)) matches = false;
                if (selectedTypes.length > 0 && !selectedTypes.includes(cardType)) matches = false;
                if (selectedLocations.length > 0 && !selectedLocations.includes(cardLoc)) matches = false;

                if (matches) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (resultsCountText) {
                resultsCountText.textContent = `${visibleCount} role${visibleCount === 1 ? '' : 's'} currently available`;
            }

            let emptyState = opportunityList.querySelector('.no-results-state');
            if (visibleCount === 0) {
                if (!emptyState) {
                    emptyState = document.createElement('div');
                    emptyState.className = 'no-results-state';
                    emptyState.innerHTML = `
                        <h3>No matching roles found</h3>
                        <p>Try adjusting your search keywords or clearing some active filters.</p>
                        <button type="button" class="btn btn-secondary" id="reset-no-results-btn">Reset All Filters</button>
                    `;
                    opportunityList.appendChild(emptyState);
                    emptyState.querySelector('#reset-no-results-btn').addEventListener('click', resetFilters);
                }
                emptyState.style.display = 'block';
            } else if (emptyState) {
                emptyState.style.display = 'none';
            }
        };

        const resetFilters = () => {
            if (opportunitySearchForm) opportunitySearchForm.reset();
            document.querySelectorAll('aside.filter-panel input[type="checkbox"]').forEach(cb => cb.checked = false);
            if (resultsTitle) resultsTitle.textContent = 'Recommended opportunities';
            applyFilters();
        };

        document.querySelectorAll('aside.filter-panel input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', applyFilters);
        });

        if (opportunitySearchForm) {
            opportunitySearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const kw = document.getElementById('opportunity-keyword')?.value.trim();
                if (resultsTitle && kw) {
                    resultsTitle.textContent = `Roles matching "${kw}"`;
                }
                applyFilters();
            });
        }

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', resetFilters);
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', () => {
                const val = sortSelect.value;
                if (val === 'title') {
                    roleCards.sort((a, b) => (a.getAttribute('data-title') || '').localeCompare(b.getAttribute('data-title') || ''));
                } else if (val === 'location') {
                    roleCards.sort((a, b) => (a.getAttribute('data-location') || '').localeCompare(b.getAttribute('data-location') || ''));
                }
                roleCards.forEach(card => opportunityList.appendChild(card));
            });
        }

        const updateSaveButtons = () => {
            document.querySelectorAll('.save-job').forEach(button => {
                const jobId = button.getAttribute('data-job-id');
                if (jobId && JewtreadStore.isJobSaved(jobId)) {
                    button.classList.add('saved');
                    button.textContent = 'Saved';
                    button.setAttribute('aria-pressed', 'true');
                }
            });
        };
        updateSaveButtons();

        document.querySelectorAll('.save-job').forEach(button => {
            button.addEventListener('click', () => {
                const jobId = button.getAttribute('data-job-id') || 'job-' + Math.random().toString(36).substr(2, 5);
                button.setAttribute('data-job-id', jobId);
                const isSavedNow = JewtreadStore.toggleSaveJob(jobId);

                button.classList.toggle('saved', isSavedNow);
                button.textContent = isSavedNow ? 'Saved' : 'Save role';
                button.setAttribute('aria-pressed', isSavedNow ? 'true' : 'false');
                showToast(isSavedNow ? 'Role saved to your dashboard!' : 'Role removed from saved list.');
            });
        });
    }

    // ==========================================
    // 8. Quick Apply Modal Handler  [PROTOTYPE - localStorage only]
    // ==========================================
    const quickApplyModal = document.getElementById('quick-apply-modal');
    const closeQuickApplyModal = document.getElementById('close-quick-apply-modal');
    const quickApplyForm = document.getElementById('quick-apply-form');
    const quickApplyRoleTitle = document.getElementById('quick-apply-role-title');
    const quickApplyJobId = document.getElementById('quick-apply-job-id');
    const dropzone = document.getElementById('qa-dropzone');
    const fileInput = document.getElementById('qa-resume-file');
    const filePreview = document.getElementById('qa-file-preview');

    if (quickApplyModal) {
        document.querySelectorAll('.quick-apply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-job-title') || 'Vacancy';
                const jobId = btn.getAttribute('data-job-id') || 'job-custom';
                if (quickApplyRoleTitle) quickApplyRoleTitle.textContent = `Quick Apply for ${title}`;
                if (quickApplyJobId) quickApplyJobId.value = jobId;
                quickApplyModal.classList.add('is-open');
            });
        });

        if (closeQuickApplyModal) {
            closeQuickApplyModal.addEventListener('click', () => {
                quickApplyModal.classList.remove('is-open');
            });
        }

        quickApplyModal.addEventListener('click', (e) => {
            if (e.target === quickApplyModal) {
                quickApplyModal.classList.remove('is-open');
            }
        });

        if (dropzone && fileInput) {
            dropzone.addEventListener('click', () => fileInput.click());
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('is-dragover');
            });
            dropzone.addEventListener('dragleave', () => dropzone.classList.remove('is-dragover'));
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('is-dragover');
                if (e.dataTransfer.files.length > 0) {
                    fileInput.files = e.dataTransfer.files;
                    if (filePreview) filePreview.textContent = `Attached: ${e.dataTransfer.files[0].name}`;
                }
            });

            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0 && filePreview) {
                    filePreview.textContent = `Attached: ${fileInput.files[0].name}`;
                }
            });
        }

        if (quickApplyForm) {
            quickApplyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('qa-name')?.value;
                const email = document.getElementById('qa-email')?.value;
                const jobId = quickApplyJobId?.value;
                const title = quickApplyRoleTitle?.textContent.replace('Quick Apply for ', '');

                JewtreadStore.addApplication({
                    jobId: jobId,
                    title: title,
                    name: name,
                    email: email
                });

                quickApplyModal.classList.remove('is-open');
                quickApplyForm.reset();
                if (filePreview) filePreview.textContent = '';
                showToast('Application submitted successfully!');
            });
        }
    }

    // ==========================================
    // 9. Employer Dashboard Interactivity  [PROTOTYPE - localStorage only]
    // ==========================================
    const postJobModal = document.getElementById('post-job-modal');
    const openPostJobBtn = document.getElementById('open-post-job-modal');
    const closePostJobBtn = document.getElementById('close-post-job-modal');
    const postJobForm = document.getElementById('post-job-form');
    const employerJobsTableBody = document.getElementById('employer-jobs-table-body');
    const kpiActiveJobs = document.getElementById('kpi-active-jobs');

    if (employerJobsTableBody) {
        const renderEmployerJobs = () => {
            const jobs = JewtreadStore.getEmployerJobs();
            if (kpiActiveJobs) kpiActiveJobs.textContent = jobs.length;

            employerJobsTableBody.innerHTML = jobs.map(job => `
                <tr>
                    <td><strong>${job.title}</strong></td>
                    <td>${job.category}</td>
                    <td>${job.location}</td>
                    <td>${job.type}</td>
                    <td>${job.applicants} applicant${job.applicants === 1 ? '' : 's'}</td>
                    <td><span class="status-badge shortlisted">${job.status}</span></td>
                    <td><button type="button" class="text-link" style="background:none; border:none; cursor:pointer;" onclick="alert('Viewing applicants for ${job.title}')">View Applicants</button></td>
                </tr>
            `).join('');
        };

        renderEmployerJobs();

        if (openPostJobBtn && postJobModal) {
            openPostJobBtn.addEventListener('click', () => postJobModal.classList.add('is-open'));
        }
        if (closePostJobBtn && postJobModal) {
            closePostJobBtn.addEventListener('click', () => postJobModal.classList.remove('is-open'));
        }

        if (postJobForm) {
            postJobForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('post-title')?.value;
                const category = document.getElementById('post-category')?.value;
                const location = document.getElementById('post-location')?.value;
                const type = document.getElementById('post-type')?.value;

                JewtreadStore.addEmployerJob({ title, category, location, type });
                renderEmployerJobs();
                postJobModal.classList.remove('is-open');
                postJobForm.reset();
                showToast('Vacancy published successfully!');
            });
        }
    }

    // ==========================================
    // 10. Dynamic Job Seeker Dashboard & Applications Renderer  [PROTOTYPE - localStorage only]
    // ==========================================
    const statApplicationsCount = document.getElementById('stat-applications-count');
    const statSavedCount = document.getElementById('stat-saved-count');
    const dashboardSavedRolesContainer = document.getElementById('dashboard-saved-roles-container');
    const applicationsListContainer = document.getElementById('applications-list-container');

    if (statApplicationsCount || statSavedCount || dashboardSavedRolesContainer) {
        const savedIds = JewtreadStore.getSavedJobs();
        const apps = JewtreadStore.getApplications();

        if (statApplicationsCount) statApplicationsCount.textContent = apps.length;
        if (statSavedCount) statSavedCount.textContent = savedIds.length;

        if (dashboardSavedRolesContainer && savedIds.length > 0) {
            const roleDataMap = {
                'job-1': { title: 'Executive Personal Assistant', meta: 'Private Residence Placement · Lagos', type: 'Full-time' },
                'job-2': { title: 'Operations Manager', meta: 'Corporate Talent Partner · Abuja', type: 'Full-time' },
                'job-3': { title: 'Household Chef', meta: 'Executive Household · Port Harcourt', type: 'Contract' },
                'job-4': { title: 'Customer Service Representative', meta: 'Business Services Team · Lagos', type: 'Full-time' }
            };

            dashboardSavedRolesContainer.innerHTML = savedIds.map(id => {
                const info = roleDataMap[id] || { title: 'Saved Role', meta: 'Jewtread HR Opportunity', type: 'Full-time' };
                return `
                    <article class="dashboard-role">
                        <div>
                            <span class="role-type">${info.type}</span>
                            <h3>${info.title}</h3>
                            <p>${info.meta}</p>
                        </div>
                        <a href="/jobs/" class="btn btn-secondary">View Role</a>
                    </article>
                `;
            }).join('');
        }
    }

    if (applicationsListContainer) {
        const apps = JewtreadStore.getApplications();
        const countSubmitted = document.getElementById('count-submitted');
        if (countSubmitted) countSubmitted.textContent = apps.length;

        if (apps.length > 0) {
            applicationsListContainer.innerHTML = apps.map(app => `
                <article class="application-card" style="display:flex; justify-content:space-between; align-items:center; padding:18px; border:1px solid var(--border-color); border-radius:8px; margin-bottom:12px; background:var(--bg-white);">
                    <div class="application-card-main">
                        <span class="status-badge ${app.status === 'Submitted' ? 'under-review' : 'shortlisted'}" style="margin-bottom:6px;">${app.status}</span>
                        <h3 style="font-size:1.15rem; margin-bottom:4px;">${app.title}</h3>
                        <p style="margin-bottom:0; font-size:0.9rem; color:var(--text-muted);">${app.company || 'Jewtread HR'} · ${app.location || 'Nigeria'}</p>
                        <span style="font-size:0.8rem; color:var(--text-muted);">Applied: ${app.appliedAt}</span>
                    </div>
                    <a href="/jobs/" class="text-link">View role &rarr;</a>
                </article>
            `).join('');
        }
    }

    // ==========================================
    // 11. Profile Dropdown Handler
    // ==========================================
    const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdownMenu = document.getElementById('profile-dropdown-menu');

    if (profileDropdownBtn && profileDropdownMenu) {
        profileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileDropdownMenu.classList.toggle('show');
            profileDropdownBtn.classList.toggle('active', isOpen);
            profileDropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!profileDropdownBtn.contains(e.target) && !profileDropdownMenu.contains(e.target)) {
                profileDropdownMenu.classList.remove('show');
                profileDropdownBtn.classList.remove('active');
                profileDropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ==========================================
    // 12. Saved Jobs Page Renderer  [PROTOTYPE - localStorage only]
    // ==========================================
    const savedJobsListContainer = document.getElementById('saved-jobs-list-container');
    const savedCountSubtitle = document.getElementById('saved-count-subtitle');

    if (savedJobsListContainer) {
        const renderSavedJobsPage = () => {
            const savedIds = JewtreadStore.getSavedJobs();
            if (savedCountSubtitle) {
                savedCountSubtitle.textContent = `You have ${savedIds.length} bookmarked role${savedIds.length === 1 ? '' : 's'}.`;
            }

            if (savedIds.length === 0) {
                savedJobsListContainer.innerHTML = `
                    <div class="no-results-state">
                        <h3>No Saved Jobs Yet</h3>
                        <p>You haven't bookmarked any opportunities. Explore roles to save job openings you are interested in.</p>
                        <a href="/jobs/" class="btn btn-primary">Browse Opportunities</a>
                    </div>
                `;
                return;
            }

            const roleDataMap = {
                'job-1': { title: 'Executive Personal Assistant', employer: 'Private Residence Placement', location: 'Lagos', category: 'Domestic staffing', type: 'Full-time', desc: 'Support an executive household with diary management, correspondence, errands, and day-to-day coordination.' },
                'job-2': { title: 'Operations Manager', employer: 'Corporate Talent Partner', location: 'Abuja', category: 'Corporate recruitment', type: 'Full-time', desc: 'Lead daily operations, coordinate teams, and help deliver efficient service across a growing organisation.' },
                'job-3': { title: 'Household Chef', employer: 'Executive Household', location: 'Port Harcourt', category: 'Domestic staffing', type: 'Contract', desc: 'Prepare healthy, varied meals for a private residence while maintaining an organised, professional kitchen.' },
                'job-4': { title: 'Customer Service Representative', employer: 'Business Services Team', location: 'Lagos', category: 'Corporate recruitment', type: 'Full-time', desc: 'Provide helpful, accurate support to customers and contribute to a consistent service experience.' }
            };

            savedJobsListContainer.innerHTML = savedIds.map(id => {
                const role = roleDataMap[id] || { title: 'Saved Opportunity', employer: 'Jewtread Client', location: 'Nigeria', category: 'General staffing', type: 'Full-time', desc: 'Review job specifications and submit your application.' };
                return `
                    <article class="opportunity-card" style="display:flex;">
                        <div class="opportunity-card-main">
                            <span class="role-type">${role.type}</span>
                            <h3>${role.title}</h3>
                            <p class="opportunity-employer">${role.employer}</p>
                            <div class="opportunity-meta">
                                <span>${role.location}</span>
                                <span>${role.category}</span>
                            </div>
                            <p class="opportunity-description">${role.desc}</p>
                        </div>
                        <div class="opportunity-card-actions">
                            <button class="save-job saved" type="button" data-job-id="${id}">Saved</button>
                            <button class="btn btn-secondary quick-apply-btn" type="button" data-job-id="${id}" data-job-title="${role.title}">Quick Apply</button>
                            <a href="/jobs/" class="btn btn-primary">View role</a>
                        </div>
                    </article>
                `;
            }).join('');

            savedJobsListContainer.querySelectorAll('.save-job').forEach(btn => {
                btn.addEventListener('click', () => {
                    const jobId = btn.getAttribute('data-job-id');
                    JewtreadStore.toggleSaveJob(jobId);
                    showToast('Role removed from saved list.');
                    renderSavedJobsPage();
                });
            });

            savedJobsListContainer.querySelectorAll('.quick-apply-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const title = btn.getAttribute('data-job-title') || 'Vacancy';
                    const jobId = btn.getAttribute('data-job-id') || 'job-custom';
                    const qaTitle = document.getElementById('quick-apply-role-title');
                    const qaJobId = document.getElementById('quick-apply-job-id');
                    const qaModal = document.getElementById('quick-apply-modal');
                    if (qaTitle) qaTitle.textContent = `Quick Apply for ${title}`;
                    if (qaJobId) qaJobId.value = jobId;
                    if (qaModal) qaModal.classList.add('is-open');
                });
            });
        };

        renderSavedJobsPage();
    }

    // ==========================================
    // 13. Profile & CV Page Handlers
    // ==========================================

    const profileCvDropzone = document.getElementById('profile-cv-dropzone');
    const profileCvFile = document.getElementById('profile-cv-file');
    const cvAttachedCard = document.getElementById('cv-attached-card');
    const cvFileName = document.getElementById('cv-file-name');
    const removeCvBtn = document.getElementById('remove-cv-btn');
    const addSkillForm = document.getElementById('add-skill-form');
    const newSkillInput = document.getElementById('new-skill-input');
    const skillsChipContainer = document.getElementById('skills-chip-container');

    if (profileCvDropzone && profileCvFile) {
        profileCvDropzone.addEventListener('click', () => profileCvFile.click());
        profileCvFile.addEventListener('change', () => {
            if (profileCvFile.files.length > 0) {
                const name = profileCvFile.files[0].name;
                if (cvFileName) cvFileName.textContent = name;
                if (cvAttachedCard) cvAttachedCard.hidden = false;
                showToast('New CV document attached!');
            }
        });

        profileCvDropzone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                profileCvFile.click();
            }
        });
    }

    // CV Upload page dropzone (public upload_cv page)
    const cvUploadDropzone = document.getElementById('cv-upload-dropzone');
    const cvUploadInput = document.getElementById('id_cv_file');

    if (cvUploadDropzone && cvUploadInput) {
        cvUploadDropzone.addEventListener('click', () => cvUploadInput.click());

        cvUploadInput.addEventListener('change', () => {
            if (cvUploadInput.files.length > 0) {
                const fileName = cvUploadInput.files[0].name;
                const feedbackEl = cvUploadDropzone.querySelector('p');
                if (feedbackEl) feedbackEl.textContent = `Selected: ${fileName}`;
            }
        });
    }

    if (removeCvBtn && cvAttachedCard) {
        removeCvBtn.addEventListener('click', () => {
            cvAttachedCard.hidden = true;
            if (profileCvFile) profileCvFile.value = '';
            showToast('CV document removed.');
        });
    }

    if (addSkillForm && newSkillInput && skillsChipContainer) {
        addSkillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = newSkillInput.value.trim();
            if (val) {
                const chip = document.createElement('span');
                chip.style.cssText = 'background-color: var(--bg-light); border: 1px solid var(--border-color); padding: 6px 14px; border-radius: 20px; font-size: 0.88rem; font-weight: 500;';
                chip.textContent = val;
                skillsChipContainer.appendChild(chip);
                newSkillInput.value = '';
                showToast(`Added skill "${val}"`);
            }
        });
    }

    // ==========================================
    // 14. Job Alerts & Account Forms  [PROTOTYPE - localStorage only]
    // ==========================================
    const createAlertForm = document.getElementById('create-alert-form');
    const activeAlertsContainer = document.getElementById('active-alerts-container');

    if (createAlertForm && activeAlertsContainer) {
        createAlertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('alert-title')?.value;
            const cat = document.getElementById('alert-category')?.value;
            const loc = document.getElementById('alert-location')?.value;

            const card = document.createElement('div');
            card.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 12px; background-color: var(--bg-warm);';
            card.innerHTML = `
                <div>
                    <strong style="display: block; font-size: 0.98rem;">${title}</strong>
                    <small style="color: var(--text-muted);">${cat} · ${loc} · Instant email alert</small>
                </div>
                <button type="button" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;" onclick="this.closest('div').remove(); showToast('Alert rule deleted.');">Delete</button>
            `;
            activeAlertsContainer.prepend(card);
            createAlertForm.reset();
            showToast('Job alert rule saved!');
        });
    }

    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass1 = document.getElementById('new-pass')?.value;
            const pass2 = document.getElementById('confirm-new-pass')?.value;
            if (pass1 !== pass2) {
                alert('New passwords do not match!');
                return;
            }
            changePasswordForm.reset();
            showToast('Password updated successfully!');
        });
    }

    const commPrefsForm = document.getElementById('comm-prefs-form');
    if (commPrefsForm) {
        commPrefsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Communication preferences saved!');
        });
    }

    const privacySettingsForm = document.getElementById('privacy-settings-form');
    if (privacySettingsForm) {
        privacySettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Privacy visibility settings saved!');
        });
    }

    const placementPrefsForm = document.getElementById('placement-prefs-form');
    if (placementPrefsForm) {
        placementPrefsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Placement and compensation criteria saved!');
        });
    }

    // Account Settings Tab Switcher
    const accountTabBtns = document.querySelectorAll('.account-tab-btn');
    const accountSections = document.querySelectorAll('.account-settings-section');

    if (accountTabBtns.length > 0 && accountSections.length > 0) {
        const switchAccountTab = (targetId) => {
            accountSections.forEach(sec => {
                sec.style.display = 'none';
                sec.classList.remove('active');
            });

            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.style.display = 'block';
                targetSec.classList.add('active');
            }

            accountTabBtns.forEach(btn => {
                const isMatch = btn.getAttribute('data-target') === targetId;
                btn.classList.toggle('active', isMatch);
                if (isMatch) {
                    btn.style.backgroundColor = 'var(--bg-light)';
                    btn.style.borderLeft = '3px solid var(--cta-emerald)';
                    btn.style.color = 'var(--primary-forest)';
                    btn.style.fontWeight = '600';
                } else {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderLeft = '3px solid transparent';
                    btn.style.color = btn.getAttribute('data-target') === 'sec-danger' ? '#C53030' : 'var(--text-charcoal)';
                    btn.style.fontWeight = '500';
                }
            });
        };

        accountTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                switchAccountTab(targetId);
            });
        });

        switchAccountTab('sec-password');
    }

    // ==========================================
    // 15. Hire a Professional - Dynamic Role Suggestions
    // ==========================================
    // Fake e.preventDefault() + setTimeout mock submission removed.
    // services:hire now has a real Django view -- native form POST handles this.
    // Kept: dynamic role-suggestion chips based on selected category (cosmetic UI only).
    const roleSuggestionsContainer = document.getElementById('role-suggestions');
    const roleInput = document.getElementById('roleNeeded');
    const categoryRadios = document.querySelectorAll('input[name="staffCategory"]');

    const rolePresets = {
        'Domestic Staffing': [
            { label: 'Household Chef', role: 'Household Cook / Chef' },
            { label: 'Nanny', role: 'Nanny / Governess' },
            { label: 'Chauffeur', role: 'Professional Chauffeur / Driver' },
            { label: 'Housekeeper', role: 'Experienced Housekeeper / Cleaner' },
            { label: 'Caregiver', role: 'Elderly Caregiver / Companion' },
            { label: 'Estate Manager', role: 'Estate Supervisor / Facility Manager' }
        ],
        'Corporate Recruitment': [
            { label: 'Executive PA', role: 'Executive Personal Assistant' },
            { label: 'Operations Manager', role: 'Operations & Logistics Manager' },
            { label: 'Finance / Accountant', role: 'Accountant / Financial Officer' },
            { label: 'HR Officer', role: 'Human Resources & Recruitment Officer' },
            { label: 'Sales & Marketing', role: 'Sales & Business Development Lead' },
            { label: 'Front Desk', role: 'Front Desk & Administrative Support' }
        ],
        'Workforce Outsourcing': [
            { label: 'Shift Support', role: 'Shift Operations Support' },
            { label: 'Cleaning Crew', role: 'Facility Cleaners & Janitorial Staff' },
            { label: 'Security Team', role: 'Contracted Security Personnel' },
            { label: 'Logistics / Drivers', role: 'Logistics Drivers & Fleet Staff' },
            { label: 'Hospitality Staff', role: 'Hospitality & Event Crew' },
            { label: 'Warehouse Team', role: 'Warehouse & Inventory Assistants' }
        ]
    };

    function updateRoleSuggestions(category) {
        if (!roleSuggestionsContainer) return;
        const suggestions = rolePresets[category] || rolePresets['Domestic Staffing'];
        roleSuggestionsContainer.innerHTML = '';
        suggestions.forEach(item => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'suggestion-chip';
            btn.setAttribute('data-role', item.role);
            btn.textContent = item.label;
            roleSuggestionsContainer.appendChild(btn);
        });
        bindSuggestionChips();
    }

    function bindSuggestionChips() {
        const chips = document.querySelectorAll('.suggestion-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const roleValue = chip.getAttribute('data-role');
                if (roleInput && roleValue) {
                    roleInput.value = roleValue;
                    roleInput.focus();
                    chips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                }
            });
        });
    }

    if (categoryRadios.length > 0) {
        categoryRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    updateRoleSuggestions(e.target.value);
                }
            });
        });
    }

    bindSuggestionChips();

    // ==========================================
    // 16. Services Page Interactive Tabs & Deep Links
    // ==========================================
    const serviceTabBtnsV2 = document.querySelectorAll('.services-tabs .tab-btn');
    const serviceBlocksV2 = document.querySelectorAll('.services-detail-section .service-block');

    function activateServiceTab(targetId) {
        if (!targetId || serviceBlocksV2.length === 0) return;

        serviceBlocksV2.forEach(block => {
            block.classList.remove('active');
            if (block.id === targetId) {
                block.classList.add('active');
            }
        });

        serviceTabBtnsV2.forEach(btn => {
            const isMatch = btn.getAttribute('data-target') === targetId;
            btn.classList.toggle('active', isMatch);
            btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
    }

    if (serviceTabBtnsV2.length > 0) {
        serviceTabBtnsV2.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                activateServiceTab(target);
            });
        });

        const initialHash = window.location.hash.replace('#', '');
        if (initialHash && ['domestic', 'corporate', 'management'].includes(initialHash)) {
            activateServiceTab(initialHash);
            const targetEl = document.getElementById(initialHash);
            if (targetEl) {
                setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 200);
            }
        }

        document.querySelectorAll('.service-directory-card[href^="#"]').forEach(card => {
            card.addEventListener('click', (e) => {
                const href = card.getAttribute('href');
                const targetId = href.replace('#', '');
                if (targetId && ['domestic', 'corporate', 'management'].includes(targetId)) {
                    activateServiceTab(targetId);
                }
            });
        });
    }
});