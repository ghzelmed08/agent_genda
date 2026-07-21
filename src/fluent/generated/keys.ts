import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    acl_appt_create: {
                        table: 'sys_security_acl'
                        id: '6160342a3a8a41dd94019fffb269df30'
                    }
                    acl_appt_delete: {
                        table: 'sys_security_acl'
                        id: '76fe3295fdf04ccf97397bb909c19d6b'
                    }
                    acl_appt_read: {
                        table: 'sys_security_acl'
                        id: '8ba1122abedc4acaa04413d54002fc7b'
                    }
                    acl_appt_write: {
                        table: 'sys_security_acl'
                        id: '502afd694c7644949ad0bee46492c30f'
                    }
                    acl_avail_create: {
                        table: 'sys_security_acl'
                        id: 'e0979b1d74e84a88bf30275881b40b79'
                    }
                    acl_avail_delete: {
                        table: 'sys_security_acl'
                        id: '94f447ed81c5445d9be96a40083a4efb'
                    }
                    acl_avail_read: {
                        table: 'sys_security_acl'
                        id: '4792c4e1f0cc4a40b420b1167d69b3f9'
                    }
                    acl_avail_write: {
                        table: 'sys_security_acl'
                        id: 'f484328ebd8241c8bab6025c3415539b'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'a6dc6a78a4b048ed9ee9e79d4447651e'
                    }
                    br_check_eligibility: {
                        table: 'sys_script'
                        id: 'd458a66a0c374568b33dde39fc4e2ac9'
                    }
                    br_prevent_double_booking: {
                        table: 'sys_script'
                        id: '2d71348adc234ea2bc772a10853192b7'
                    }
                    br0: {
                        table: 'sys_script'
                        id: '3400929812c746a3984f52880772d678'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: 'eb20ec759f3047f9bb1d556a7a9f6cee'
                    }
                    hr_meeting_menu: {
                        table: 'sys_app_application'
                        id: '3e3d0653a2654234b9fe5da49ce48341'
                    }
                    module_all_appointments: {
                        table: 'sys_app_module'
                        id: '09e1ce36d28042f0a6db35433a745e1d'
                    }
                    module_book_meeting: {
                        table: 'sys_app_module'
                        id: 'f4504297835d487b975c8b0c567b6d0b'
                    }
                    module_manage_availability: {
                        table: 'sys_app_module'
                        id: '9d75b27813744b7887067f8aaf43fef8'
                    }
                    module_my_agenda: {
                        table: 'sys_app_module'
                        id: 'a2738b3288754ffea068e63f34218643'
                    }
                    notify_agent_new_booking: {
                        table: 'sysevent_email_action'
                        id: '22027359b48f4a87956ce9bc8cda3290'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '890541852e034320b8355a23e91ffccc'
                    }
                    src_server_appointmentRules_ts: {
                        table: 'sys_module'
                        id: 'da87d2668bbb460096d09b680003a944'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: 'fa339f034bb5478cb7adf968dcbf418d'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice'
                        id: '01851ec6146f4803b6cd2ad037d8d8e6'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '0308d83de81e45b6b5d80b04ee3f94b4'
                        key: {
                            application_file: '8e79518e55e744d48a4821b97dd6f082'
                            source_artifact: '70faaf644cf747b5af37802f2c8ad20a'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '032120d6a0be4d83849441e5648b9b2e'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0438870252274a92a65c23d55800cc3d'
                        key: {
                            sys_security_acl: 'e0979b1d74e84a88bf30275881b40b79'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '0479da82eae74e718c8f80efb017da67'
                        key: {
                            name: 'global.hr_mtg_agent'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '05c8b99d1ae4430a948cf30085da3683'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hr_agent'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '061bf82c8bc341fa80fbe8e11a4c7dcf'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'notes'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '06defff4eed045069f7619182da90c7b'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'recurring'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '070f03671ad24ac4871dde8af45b3446'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'date'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '082b43c4483a4392bd286d07c04fcfe4'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'date'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '0a51a5231e26479380d84808af363b18'
                        key: {
                            category: 'u_hr_mtg_appointment'
                            prefix: 'APPT'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0cefb27b40454f9b94b636c702012774'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'saturday'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0fdfbc2e6cb2426f84bac53f90a8419b'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11f2480321aa4f97a8109f9e17e1e9c8'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '128e366b5d334f41bd07e649b0bc8b7e'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1490eff2171b40809d50ef83b7e43e2b'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1783da01ff7d4528bf29ab3e65a3a5ad'
                        key: {
                            sys_security_acl: 'e0979b1d74e84a88bf30275881b40b79'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '183a4ec6c1ac4dc68a5f658972485451'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d5a502eadca4589b1add67d558515b6'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '21616b4c36d34254b720592bd198937a'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2459234dcae74508bb12b27f98fbf981'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'day_of_week'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '254aeb7e4b8c41248cd58219f2a850a8'
                        key: {
                            name: 'global.hr_mtg_admin'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '262851ad7f154d078d206c8972a3f37a'
                        key: {
                            sys_ui_form: {
                                id: '9a58a3903aaa495bb3f79201ffcc4c89'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '27087c5a364c448fa9e7b1c9ea708fa3'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'no_show'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '286d438d8cab47f7bc73efb79491b3c8'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            value: 'in_person'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '29cd8723fdd3482ea1c365adb09cc3a9'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3048e354120942c687c96d6666d4654c'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'wednesday'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3716f91f51454459bac424c0d2dcbb30'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'thursday'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '37e6665e96cf493396c4805d78c72086'
                        key: {
                            sys_security_acl: '502afd694c7644949ad0bee46492c30f'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '3c80b6e3499044818a393d1bb5da4638'
                        key: {
                            application_file: 'a99c6de7b4024ae7a823557d13040a6e'
                            source_artifact: '70faaf644cf747b5af37802f2c8ad20a'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4365a5020a5f418f8e93026a437b6561'
                        key: {
                            sys_security_acl: '502afd694c7644949ad0bee46492c30f'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '456651ba862342208fbf17d27d9664e8'
                        key: {
                            name: 'u_hr_mtg_appointment'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '4680888f29f44ac2982b9bc7a84ce77f'
                        key: {
                            application_file: 'a17cdce7a3414ea0b61c198d1812709c'
                            source_artifact: '70faaf644cf747b5af37802f2c8ad20a'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4799af8bd5ed45a2945bfe73e3572fb2'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'end_time'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a83cfa95dce4077954cb059f1eec36c'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4c220076eea94f41b6f7f70bc0bf92af'
                        key: {
                            sys_security_acl: '4792c4e1f0cc4a40b420b1167d69b3f9'
                            sys_user_role: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4d35f51aa4714507816c836533babad4'
                        key: {
                            sys_security_acl: '4792c4e1f0cc4a40b420b1167d69b3f9'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '52c281c6eaa34677ba31eb6be6d6ef67'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'employee'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '569266bd8d6d423da1ea67b0a6eee81a'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            value: 'call'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5937a68d24744461b57a6417a7682caa'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'cancellation_reason'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5a9c08453fe648eeb86ee44cf2e9d979'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'agent'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5b20136555f64d31a2b2b766ecbd28a4'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '655a3a5b9d78421f844b6e9701298e34'
                        key: {
                            sys_security_acl: 'f484328ebd8241c8bab6025c3415539b'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '68e66ccc8de54dd886ab8b8440fd3e50'
                        key: {
                            sys_security_acl: '4792c4e1f0cc4a40b420b1167d69b3f9'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '69593ca8bf82496f959e69e2fae5f407'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'hr_case'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6b4d5f524a454a088b7da41157b6b0d1'
                        key: {
                            sys_security_acl: '76fe3295fdf04ccf97397bb909c19d6b'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '70faaf644cf747b5af37802f2c8ad20a'
                        key: {
                            name: 'hr_meeting_scheduler.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '710f0e4495f648b6b5c0b6e1685b156d'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '74b66322c98f459189acedd381dc386a'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hr_case'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '766cffd715714ef696340f2c5be58f16'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '802c698af42f4742b7d30f131ff57808'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'date'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '817fc79e6c084c53b6a8e0ddfab94441'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'agent'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '84d8121d4f2c45fb958f59e477301f05'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '88111da3a3404e97852d6b4ed375bdbc'
                        key: {
                            name: 'u_hr_mtg_availability'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '886172e184c342ae90e778521fd330c7'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '886461ed31c240e19481854fe3ee6342'
                        key: {
                            sys_security_acl: '8ba1122abedc4acaa04413d54002fc7b'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8a6e80fb6664409bb6579c1b22452003'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'employee'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8c8c9b255f01472dbac139b16a4f3dfb'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'cancellation_reason'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8d0c4031a63c4e868fc12e9745a8f625'
                        key: {
                            sys_security_acl: '94f447ed81c5445d9be96a40083a4efb'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d44e4ec02244424bae5ec4ab48e6be1'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8e79518e55e744d48a4821b97dd6f082'
                        key: {
                            name: 'hr_meeting_scheduler'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '8e86d81f388b4fb8bb087b9d9ec19ab0'
                        key: {
                            role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                            contains: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8e9b89b2136f4af6a8c941aac0c63169'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'recurring'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f5202a6ce6644ec9d3e44d411ed25d3'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8f5adcad37af4c168a213c73ad48d9c7'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'start_time'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '90fcd0c22000451893f4b3f7e5423f32'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9185a3a8c0c74c6dafcd71bb3af0106f'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'recurring'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '92fdaed84b0241fc90d754decd3ad9de'
                        key: {
                            sys_security_acl: 'f484328ebd8241c8bab6025c3415539b'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '9a58a3903aaa495bb3f79201ffcc4c89'
                        key: {
                            name: 'u_hr_mtg_availability'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9b1f9a2ccc344c3097693066b74afadb'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a00324c4c2fd44e99e3063477d8997ad'
                        key: {
                            sys_ui_section: {
                                id: 'e4ee54468a054fd0936b747356272c4d'
                                key: {
                                    name: 'u_hr_mtg_availability'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a082b0645e5a4149a0b225f72b3fdf20'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'a17cdce7a3414ea0b61c198d1812709c'
                        key: {
                            name: 'global/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a390253b6296496b96c035919dc5a873'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a5464c9852304327a4cbe987fc626b80'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'monday'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a77b9da368ef4b2888e7da15e5f48a31'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'end_time'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'a99c6de7b4024ae7a823557d13040a6e'
                        key: {
                            name: 'global/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'aa57ed60eccb41899f2aa276f8f97356'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'acc45bb8486c43cda88c398b65cfc51a'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'employee'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b18ff7996b0543149c0b72ac5ed754fa'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b3c6557b65e74a3ea392fbe8e8cca745'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'sunday'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b3db37400d7f4530997b6973cb5d8e48'
                        key: {
                            sys_security_acl: '6160342a3a8a41dd94019fffb269df30'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'b7f4d881d3774ab6850b58f65219a8d0'
                        key: {
                            name: 'u_hr_mtg_appointment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b802934a4df84da28e758af9ff7f4d5a'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ba5514204dbe4bec9dc8e9d5832a43a6'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'baff572f78e24b9baea4cb4576d296e8'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'start_time'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bf2354bc16a242b5b2f0c99172499b4b'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c1c1e2928ee7470ea852bc83f8edd59b'
                        key: {
                            sys_security_acl: '8ba1122abedc4acaa04413d54002fc7b'
                            sys_user_role: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c36906ae74a7418c926bf5590d3fd2e3'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c44f9f2bd89f41b797fe17f007f11773'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c51e826808774c0399d84c5ec0e053d1'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                            value: 'video'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                        key: {
                            name: 'global.hr_mtg_employee'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c9beb9d39c63465d97e976bd02ebc8ad'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'tuesday'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb09e00cd35d42bfb55830e1e987c093'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'hr_agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'cbd0f47b0f3d417f922968efc696a3ec'
                        key: {
                            name: 'u_hr_mtg_availability'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cbde10fb137a447091803cfa4d9bdaec'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'hr_case'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ced1efa02c774783841ad6aecd102a09'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'meeting_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd36cf7f41c8e4f9ab21eaed2ee26280a'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'agent'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'd51e2ac3120a4b8cb338c7df6d7da4b0'
                        key: {
                            sys_ui_form: {
                                id: '21616b4c36d34254b720592bd198937a'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd578ea2529f54b74acd2dcd9fcf204b6'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6e3394a548b4e38b11d3cdd89d45f45'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'booked'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd73fc913169648f58da2a9e925aaa90f'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'meeting_type'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9690079b0f442cdb9a20ada85e8eadd'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'db2bb608aabd47b781fe29f3f0ab4932'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ddf2d9ad5c01412f900e759891fe8511'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df4a3172decf436f98113e7afa9a55fd'
                        key: {
                            name: 'u_hr_mtg_availability'
                            element: 'day_of_week'
                            value: 'friday'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3132f31ffc542cda52c00f36b6b8162'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'e4ee54468a054fd0936b747356272c4d'
                        key: {
                            name: 'u_hr_mtg_availability'
                            caption: 'General'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec4d5907961b414c8b9e29507207ab88'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'cancellation_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'ed003c218f6f486eb1b152d1a1fb3c33'
                        key: {
                            role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                            contains: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ef9560c8d855468798268ce4cf83c963'
                        key: {
                            sys_security_acl: '8ba1122abedc4acaa04413d54002fc7b'
                            sys_user_role: {
                                id: '0479da82eae74e718c8f80efb017da67'
                                key: {
                                    name: 'global.hr_mtg_agent'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ef9b7c55da39411a98388bc659e50845'
                        key: {
                            sys_ui_section: {
                                id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                                key: {
                                    name: 'u_hr_mtg_appointment'
                                    caption: 'General'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'status'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f05fa0acebde4a3184f369b2b9c36480'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f1e7bca6cfeb4c41b885b025eb5934ce'
                        key: {
                            sys_security_acl: '6160342a3a8a41dd94019fffb269df30'
                            sys_user_role: {
                                id: 'c6d80d0f63f64f84b3d7575d9b0c497d'
                                key: {
                                    name: 'global.hr_mtg_employee'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f292c174b9f748ba9b80f1a1aa12e41e'
                        key: {
                            category: 'u_hr_mtg_availability'
                            prefix: 'AVAIL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'f8bc3916a9fe47a6a3f5ee4fb22fcfaf'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            caption: 'General'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'f92f6f5cf75e457ea28872d835110049'
                        key: {
                            sys_security_acl: '6160342a3a8a41dd94019fffb269df30'
                            sys_user_role: {
                                id: '254aeb7e4b8c41248cd58219f2a850a8'
                                key: {
                                    name: 'global.hr_mtg_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc63eb3f48c94a959ae83c9e15a32fc0'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'hr_agent'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'fc7b93a5db3442db82c4993f18dff2a3'
                        key: {
                            name: 'u_hr_mtg_appointment'
                            element: 'status'
                        }
                    },
                ]
            }
        }
    }
}
