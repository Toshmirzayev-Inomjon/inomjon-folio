"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import type { LocationSetting, Message, Profile, Project } from "@prisma/client";
import { FileUp, FolderKanban, ImageUp, Inbox, LayoutDashboard, MapPinned, Plus, Save, Settings, Trash2, type LucideIcon } from "lucide-react";
import { adminContent, siteIdentity } from "@/data/siteData";

type Props = {
  profile: Profile;
  projects: Project[];
  location: LocationSetting;
  messages: Message[];
};

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = (await res.json().catch(() => ({}))) as { message?: string; url?: string };
  if (!res.ok || !data.url) throw new Error(data.message ?? adminContent.messages.uploadFailed);
  return data.url;
}

function previewableImageSrc(value: string) {
  const src = value.trim();
  if (!src) return "";
  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:" ? src : "";
  } catch {
    return "";
  }
}

function ImagePreview({ src, alt, className }: { src: string; alt: string; className: string }) {
  const preview = previewableImageSrc(src);

  if (!preview) {
    return (
      <div className={`${className} grid place-items-center bg-slate-900 text-slate-500`}>
        <ImageUp size={30} />
      </div>
    );
  }

  return <img src={preview} alt={alt} className={className} loading="lazy" decoding="async" />;
}

const adminIconMap: Record<(typeof adminContent.nav)[number]["icon"] | (typeof adminContent.stats)[number]["icon"], LucideIcon> = {
  settings: Settings,
  folder: FolderKanban,
  location: MapPinned,
  inbox: Inbox
};

export function AdminPanel({ profile, projects, location, messages }: Props) {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [profileImage, setProfileImage] = useState(profile.heroImage);
  const [createProjectImage, setCreateProjectImage] = useState("");
  const [projectImages, setProjectImages] = useState<Record<string, string>>(() => Object.fromEntries(projects.map((project) => [project.id, project.imageUrl])));

  useEffect(() => {
    setProfileImage(profile.heroImage);
    setProjectImages(Object.fromEntries(projects.map((project) => [project.id, project.imageUrl])));
  }, [profile.heroImage, projects]);

  async function requestJson(path: string, method: "POST" | "PUT" | "DELETE", payload?: Record<string, unknown>) {
    const res = await fetch(path, {
      method,
      headers: payload ? { "Content-Type": "application/json" } : undefined,
      body: payload ? JSON.stringify(payload) : undefined
    });
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    setNotice(res.ok ? adminContent.messages.saved : data.message ?? adminContent.messages.failed);
    if (res.ok) router.refresh();
    return res.ok;
  }

  async function uploadImageToForm(event: ChangeEvent<HTMLInputElement>, inputName: string, onUploaded: (url: string) => void) {
    const control = event.currentTarget;
    const file = control.files?.[0];
    const form = control.form;
    if (!file || !form) return;

    setNotice(adminContent.messages.uploadingImage);
    try {
      const url = await uploadFile(file);
      const field = form.elements.namedItem(inputName);
      if (field instanceof HTMLInputElement) field.value = url;
      onUploaded(url);
      setNotice(adminContent.messages.imageUploaded);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : adminContent.messages.imageUploadFailed);
    } finally {
      control.value = "";
    }
  }

  async function uploadCvToForm(event: ChangeEvent<HTMLInputElement>, inputName: string) {
    const control = event.currentTarget;
    const file = control.files?.[0];
    const form = control.form;
    if (!file || !form) return;

    setNotice(adminContent.messages.uploadingCv);
    try {
      const url = await uploadFile(file);
      const field = form.elements.namedItem(inputName);
      if (field instanceof HTMLInputElement) field.value = url;
      setNotice(adminContent.messages.cvUploaded);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : adminContent.messages.uploadFailed);
    } finally {
      control.value = "";
    }
  }

  async function submitJson(path: string, form: HTMLFormElement) {
    await requestJson(path, "PUT", Object.fromEntries(new FormData(form)));
  }

  async function createProject(form: HTMLFormElement) {
    const payload = Object.fromEntries(new FormData(form));
    const ok = await requestJson("/api/admin/projects", "POST", { ...payload, featured: payload.featured === "on" });
    if (ok) {
      form.reset();
      setCreateProjectImage("");
    }
  }

  async function saveProject(id: string, form: HTMLFormElement) {
    const payload = Object.fromEntries(new FormData(form));
    await requestJson(`/api/admin/projects?id=${id}`, "PUT", { ...payload, featured: payload.featured === "on" });
  }

  async function deleteProject(id: string) {
    await requestJson(`/api/admin/projects?id=${id}`, "DELETE");
  }

  async function deleteMessage(id: string) {
    await requestJson(`/api/admin/messages?id=${id}`, "DELETE");
  }

  const stats = adminContent.stats.map((stat) => ({
    label: stat.label,
    value: "value" in stat ? stat.value : stat.valueKey === "projects" ? projects.length : messages.length,
    icon: adminIconMap[stat.icon]
  }));

  return (
    <div className="content-scroll min-h-screen overflow-y-auto">
      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:gap-6 sm:py-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">
          <div className="premium-card flex h-full flex-col rounded-[30px] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white">
                <LayoutDashboard size={22} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-300">{adminContent.labels.dashboardEyebrow}</p>
                <h1 className="text-xl font-black text-white">{adminContent.labels.dashboardTitle}</h1>
              </div>
            </div>

            <nav className="mt-8 grid gap-2 text-sm font-black text-slate-300">
              {adminContent.nav.map(({ label, href, icon }) => {
                const Icon = adminIconMap[icon];

                return (
                  <a key={href} href={`#${href}`} className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-slate-950 hover:text-white">
                    <Icon size={18} /> {label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-200">{adminContent.labels.status}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{adminContent.labels.statusText}</p>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <header className="premium-card rounded-[30px] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo-300">{siteIdentity.brandName}</p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl">{adminContent.labels.contentTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">{adminContent.labels.contentDescription}</p>
              </div>
              {notice && <p className="rounded-full bg-indigo-500/12 px-4 py-2 text-sm font-black text-indigo-200 ring-1 ring-indigo-300/20">{notice}</p>}
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <Icon className="text-indigo-300" size={22} />
                    <p className="mt-4 text-3xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-sm font-bold text-slate-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </header>

          <section id="profile" className="premium-card rounded-[30px] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Settings className="text-indigo-300" size={22} />
              <h2 className="text-2xl font-black text-white">{adminContent.labels.profileEdit}</h2>
            </div>
            <form
              className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]"
              onSubmit={(event) => {
                event.preventDefault();
                submitJson("/api/admin/profile", event.currentTarget);
              }}
            >
              <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
                <ImagePreview src={profileImage} alt={profile.name} className="aspect-[4/5] w-full rounded-2xl object-cover" />
                <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white">
                  <ImageUp size={17} />
                  {adminContent.labels.uploadImage}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => uploadImageToForm(event, "heroImage", setProfileImage)}
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="label">{adminContent.form.name}<input className="field" name="name" defaultValue={profile.name} /></label>
                <label className="label">{adminContent.form.headline}<input className="field" name="headline" defaultValue={profile.headline} /></label>
                <label className="label sm:col-span-2">{adminContent.form.bio}<textarea className="field min-h-28" name="bio" defaultValue={profile.bio} /></label>
                <label className="label sm:col-span-2">{adminContent.form.heroImageUrl}<input className="field" name="heroImage" defaultValue={profile.heroImage} onChange={(event) => {
                  const preview = previewableImageSrc(event.currentTarget.value);
                  if (preview) setProfileImage(preview);
                }} /></label>
                <div className="label">
                  <span>{adminContent.form.cvUrl}</span>
                  <input className="field" name="cvUrl" defaultValue={profile.cvUrl ?? ""} />
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white">
                    <FileUp size={17} />
                    {adminContent.labels.uploadCv}
                    <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(event) => uploadCvToForm(event, "cvUrl")} />
                  </label>
                </div>
                <label className="label">{adminContent.form.telegramUrl}<input className="field" name="telegramUrl" defaultValue={profile.telegramUrl ?? ""} /></label>
                <label className="label">{adminContent.form.githubUrl}<input className="field" name="githubUrl" defaultValue={profile.githubUrl ?? ""} /></label>
                <label className="label">{adminContent.form.linkedinUrl}<input className="field" name="linkedinUrl" defaultValue={profile.linkedinUrl ?? ""} /></label>
                <label className="label">{adminContent.form.instagramUrl}<input className="field" name="instagramUrl" defaultValue={profile.instagramUrl ?? ""} /></label>
                <button className="btn-primary sm:col-span-2"><Save size={17} /> {adminContent.actions.saveProfile}</button>
              </div>
            </form>
          </section>

          <section id="location" className="premium-card rounded-[30px] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <MapPinned className="text-indigo-300" size={22} />
              <h2 className="text-2xl font-black text-white">{adminContent.labels.mapsControl}</h2>
            </div>
            <form
              className="grid gap-4 lg:grid-cols-3"
              onSubmit={(event) => {
                event.preventDefault();
                submitJson("/api/admin/location", event.currentTarget);
              }}
            >
              <label className="label">{adminContent.form.latitude}<input className="field" name="latitude" defaultValue={location.latitude} /></label>
              <label className="label">{adminContent.form.longitude}<input className="field" name="longitude" defaultValue={location.longitude} /></label>
              <label className="label lg:col-span-3">{adminContent.form.mapIframeUrl}<input className="field" name="iframeUrl" defaultValue={location.iframeUrl ?? ""} /></label>
              <button className="btn-primary lg:col-span-3"><Save size={17} /> {adminContent.actions.saveLocation}</button>
            </form>
          </section>

          <section id="projects" className="premium-card rounded-[30px] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <FolderKanban className="text-indigo-300" size={22} />
              <h2 className="text-2xl font-black text-white">{adminContent.labels.projectCrud}</h2>
            </div>

            <form
              className="grid gap-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 lg:grid-cols-[220px_minmax(0,1fr)]"
              onSubmit={(event) => {
                event.preventDefault();
                createProject(event.currentTarget);
              }}
            >
              <div className="rounded-3xl bg-white/5 p-3 ring-1 ring-white/10">
                <ImagePreview src={createProjectImage} alt={adminContent.labels.newProjectPreview} className="aspect-[16/10] w-full rounded-2xl object-cover" />
                <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white">
                  <ImageUp size={17} />
                  {adminContent.labels.uploadImage}
                  <input type="file" accept="image/*" className="hidden" onChange={(event) => uploadImageToForm(event, "imageUrl", setCreateProjectImage)} />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="label">{adminContent.form.title}<input className="field" name="title" placeholder={adminContent.placeholders.projectTitle} /></label>
                <label className="label">{adminContent.form.imageUrl}<input className="field" name="imageUrl" placeholder={adminContent.placeholders.imageUrl} onChange={(event) => setCreateProjectImage(previewableImageSrc(event.currentTarget.value))} /></label>
                <label className="label lg:col-span-2">{adminContent.form.description}<textarea className="field min-h-24" name="description" placeholder={adminContent.placeholders.projectDescription} /></label>
                <label className="label">{adminContent.form.techTags}<input className="field" name="techStack" placeholder={adminContent.placeholders.techTags} /></label>
                <label className="label">{adminContent.form.visitUrl}<input className="field" name="visitUrl" placeholder={adminContent.placeholders.imageUrl} /></label>
                <label className="label">{adminContent.form.githubUrl}<input className="field" name="githubUrl" placeholder={adminContent.placeholders.githubUrl} /></label>
                <label className="flex items-center gap-2 text-sm font-black text-slate-300"><input name="featured" type="checkbox" /> {adminContent.labels.featured}</label>
                <button className="btn-primary lg:col-span-2"><Plus size={17} /> {adminContent.actions.createProject}</button>
              </div>
            </form>

            <div className="mt-6 grid gap-5">
              {projects.map((project) => (
                <form
                  key={project.id}
                  className="grid gap-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 xl:grid-cols-[220px_minmax(0,1fr)]"
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveProject(project.id, event.currentTarget);
                  }}
                >
                  <div className="rounded-3xl bg-white/5 p-3 ring-1 ring-white/10">
                    <ImagePreview src={projectImages[project.id] ?? project.imageUrl} alt={project.title} className="aspect-[16/10] w-full rounded-2xl object-cover" />
                    <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-black text-white">
                      <ImageUp size={17} />
                      {adminContent.labels.uploadImage}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                          uploadImageToForm(event, "imageUrl", (url) => {
                            setProjectImages((current) => ({ ...current, [project.id]: url }));
                          })
                        }
                      />
                    </label>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="label">{adminContent.form.title}<input className="field" name="title" defaultValue={project.title} /></label>
                    <label className="label">{adminContent.form.imageUrl}<input className="field" name="imageUrl" defaultValue={project.imageUrl} onChange={(event) => {
                      const preview = previewableImageSrc(event.currentTarget.value);
                      if (preview) setProjectImages((current) => ({ ...current, [project.id]: preview }));
                    }} /></label>
                    <label className="label sm:col-span-2">{adminContent.form.description}<textarea className="field min-h-24" name="description" defaultValue={project.description} /></label>
                    <label className="label">{adminContent.form.techTags}<input className="field" name="techStack" defaultValue={project.techStack} /></label>
                    <label className="label">{adminContent.form.visitUrl}<input className="field" name="visitUrl" defaultValue={project.visitUrl ?? ""} /></label>
                    <label className="label">{adminContent.form.githubUrl}<input className="field" name="githubUrl" defaultValue={project.githubUrl ?? ""} /></label>
                    <label className="flex items-center gap-2 text-sm font-black text-slate-300"><input name="featured" type="checkbox" defaultChecked={project.featured} /> {adminContent.labels.featured}</label>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <button className="btn-primary"><Save size={17} /> {adminContent.actions.save}</button>
                      <button type="button" onClick={() => deleteProject(project.id)} className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-5 py-3 font-black text-rose-200 transition hover:bg-rose-500/20">
                        <Trash2 size={17} /> {adminContent.actions.delete}
                      </button>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </section>

          <section id="inbox" className="premium-card rounded-[30px] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <Inbox className="text-indigo-300" size={22} />
              <h2 className="text-2xl font-black text-white">{adminContent.labels.inbox}</h2>
            </div>
            <div className="grid gap-4">
              {messages.length === 0 && <p className="rounded-3xl bg-white/5 p-5 font-bold text-slate-400 ring-1 ring-white/10">{adminContent.labels.noMessages}</p>}
              {messages.map((message) => (
                <article key={message.id} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="flex flex-wrap justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-white">{message.subject}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-400">{message.name} · {message.email}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-400">{new Date(message.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-4 leading-7 text-slate-300">{message.body}</p>
                  <button onClick={() => deleteMessage(message.id)} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-black text-rose-200 transition hover:bg-rose-500/20">
                    <Trash2 size={16} /> {adminContent.actions.deleteMessage}
                  </button>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
